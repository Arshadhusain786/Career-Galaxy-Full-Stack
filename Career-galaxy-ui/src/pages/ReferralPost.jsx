import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PlusIcon, BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ReferralPost = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applyingPostId, setApplyingPostId] = useState(null);
    const [appliedPostIds, setAppliedPostIds] = useState(new Set());

    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        company: '',
        jobRole: '',
        minExperience: '',
        maxExperience: '',
        domain: '',
        description: ''
    });

    useEffect(() => {
        fetchPosts();
        fetchMyApplications();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/referral-posts/get-all');
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch referral posts", error);
        }
    };

    const fetchMyApplications = async () => {
        try {
            const response = await api.get('/applications/my', {
                params: { email: user?.email }
            });
            const appliedIds = new Set(response.data.map(app => app.referralPostId));
            setAppliedPostIds(appliedIds);
        } catch (error) {
            console.error("Failed to fetch user applications", error);
        }
    };

    const handleApply = async (postId) => {
        setApplyingPostId(postId);
        try {
            const response = await api.post('/applications', {
                referralPostId: postId,
                applicantEmail: user?.email
            });

            if (response.status === 200 || response.status === 201) {
                setAppliedPostIds(prev => new Set([...prev, postId]));
            }
        } catch (error) {
            console.error('Failed to apply for referral post', error);
            alert(error.response?.data?.message || 'Failed to apply. Please try again.');
        } finally {
            setApplyingPostId(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const payload = {
                providerEmail: user?.email, // Changed from providerId to providerEmail as requested
                company: formData.company,
                jobRole: formData.jobRole,
                minExperience: parseInt(formData.minExperience),
                maxExperience: parseInt(formData.maxExperience),
                domain: formData.domain,
                description: formData.description
            };

            const response = await api.post('/referral-posts/create', payload);

            if (response.status === 200 || response.status === 201) {
                setIsModalOpen(false);
                setFormData({
                    company: '',
                    jobRole: '',
                    minExperience: '',
                    maxExperience: '',
                    domain: '',
                    description: ''
                });
                fetchPosts(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to create referral post", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Referral Posts</h1>
                        <p className="text-gray-500">Browse and create job referral opportunities.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create Post
                    </button>
                </div>

                {/* List of Posts */}
                <div className="grid gap-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
                            <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No referral posts found. Be the first to create one!</p>
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{post.jobRole}</h3>
                                        <p className="text-purple-600 font-medium">{post.company}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <BriefcaseIcon className="w-4 h-4" /> {post.minExperience}-{post.maxExperience} Years
                                    </span>
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <MapPinIcon className="w-4 h-4" /> {post.domain}
                                    </span>

                                    {/* Apply Button — hidden for the post creator */}
                                    {user?.email !== post.providerEmail && (
                                        <button
                                            onClick={() => handleApply(post.id)}
                                            disabled={applyingPostId === post.id || appliedPostIds.has(post.id)}
                                            className={`ml-auto px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                                                appliedPostIds.has(post.id)
                                                    ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
                                                    : applyingPostId === post.id
                                                        ? 'bg-purple-100 text-purple-400 cursor-wait'
                                                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md active:scale-95'
                                            }`}
                                        >
                                            {appliedPostIds.has(post.id) ? (
                                                <><span>✓</span> Applied</>
                                            ) : applyingPostId === post.id ? (
                                                <><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Applying...</>
                                            ) : (
                                                'Apply'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">Create Referral Post</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Amazon"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                    <input
                                        type="text"
                                        name="jobRole"
                                        required
                                        value={formData.jobRole}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Backend Engineer"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Exp (Years)</label>
                                        <input
                                            type="number"
                                            name="minExperience"
                                            required
                                            min="0"
                                            value={formData.minExperience}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Exp (Years)</label>
                                        <input
                                            type="number"
                                            name="maxExperience"
                                            required
                                            min="0"
                                            value={formData.maxExperience}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                                    <input
                                        type="text"
                                        name="domain"
                                        required
                                        value={formData.domain}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Java, React, Full Stack"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Brief description of the role..."
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading ? 'Creating...' : 'Post Referral'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default ReferralPost;

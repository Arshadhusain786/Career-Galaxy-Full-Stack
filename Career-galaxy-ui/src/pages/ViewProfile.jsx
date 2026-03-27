import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline'; 

const ViewProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser || {});
        } catch (error) {
            console.error("Failed to load user data", error);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 text-center animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
            </div>
        );
    }

    const userName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'User';
    const email = user?.email || 'Not provided';
    const phone = user?.phone || 'Not provided';
    const bio = user?.bio || 'Passionate software developer focused on building scalable frontend architectures and crafting amazing user experiences.';
    const role = user?.role || user?.title || 'Frontend Developer';
    const skills = user?.skills?.length ? user.skills : ['React', 'JavaScript', 'Tailwind CSS', 'Redux', 'Node.js'];
    const experience = user?.experience || 'Frontend Engineer at Tech Corp (2023 - Present)\n- Developed robust dashboard UI using React.\n- Refactored legacy monolithic stylesheets into Tailwind utility classes.\n- Improved page performance scores by 35%.';
    const avatarUrl = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`;

    return (
        <div className="max-w-4xl mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Public Profile</h1>
                <Link to="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-600 rounded-xl font-medium transition-colors shadow-sm">
                    <PencilSquareIcon className="w-5 h-5" /> Edit Profile
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
                {/* Header Banner */}
                <div className="h-40 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-90"></div>
                
                <div className="px-8 pb-10">
                    {/* Avatar & Basic Info */}
                    <div className="relative flex justify-between items-end -mt-16 mb-8">
                        <div className="flex items-end gap-5">
                            <img src={avatarUrl} alt={userName} className="w-32 h-32 rounded-full border-4 border-white object-cover bg-purple-50 shadow-md relative z-10" />
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{userName}</h2>
                                <p className="text-purple-600 font-medium">{role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Details Sidebar */}
                        <div className="col-span-1 space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                                <h3 className="font-semibold text-gray-900 mb-4 tracking-tight">Contact Info</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-gray-800 font-medium break-words text-sm">{email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-gray-800 font-medium text-sm">{phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                                <h3 className="font-semibold text-gray-900 mb-4 tracking-tight">Top Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-1 lg:col-span-2 space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
                                <div className="text-gray-600 leading-relaxed font-light">
                                    {bio.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                                <div className="text-gray-600 leading-relaxed font-light">
                                    {experience.split('\n').map((line, i) => (
                                        <p key={i} className={`mb-1 ${line.startsWith('-') ? 'pl-4 relative before:content-["•"] before:absolute before:left-0 before:text-gray-400' : 'font-medium text-gray-800 mt-4 mb-2 first:mt-0'}`}>
                                            {line.replace(/^- /, '')}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewProfile;

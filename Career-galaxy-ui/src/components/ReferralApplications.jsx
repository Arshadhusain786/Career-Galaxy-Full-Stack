import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const STAGE_STYLES = {
    APPLIED: 'text-blue-600 bg-blue-50 border-blue-100',
    IN_REVIEW: 'text-amber-600 bg-amber-50 border-amber-100',
    INTERVIEW: 'text-purple-600 bg-purple-50 border-purple-100',
    OFFERED: 'text-green-600 bg-green-50 border-green-100',
    REJECTED: 'text-red-600 bg-red-50 border-red-100',
};

const formatStage = (stage) => {
    if (!stage) return 'Applied';
    return stage.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\B\w+/g, w => w.toLowerCase());
};

const ReferralApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await api.get('/applications/my', {
                params: { email: user?.email }
            });
            setApplications(response.data);
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">My Applications</h3>
                <button className="text-sm text-purple-600 font-medium hover:text-purple-700">View All</button>
            </div>

            <div className="overflow-x-auto">
                {loading ? (
                    <div className="text-center py-10 text-gray-400 text-sm">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm">No applications yet. Apply to referral posts to get started!</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applications.map((app, index) => (
                                <tr key={app.id || index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://logo.clearbit.com/${app.company?.toLowerCase().replace(/\s+/g, '')}.com`}
                                                alt={app.company}
                                                className="w-8 h-8 rounded-lg object-contain bg-gray-50 p-1"
                                                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(app.company || '') }}
                                            />
                                            <span className="font-medium text-gray-900">{app.company}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {app.jobRole}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${STAGE_STYLES[app.stage] || STAGE_STYLES.APPLIED}`}>
                                            {formatStage(app.stage)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReferralApplications;

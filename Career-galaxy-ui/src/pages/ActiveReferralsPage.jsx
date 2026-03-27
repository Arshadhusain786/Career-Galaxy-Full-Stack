import React, { useState, useEffect } from 'react';
import activeReferralService from '../api/activeReferralService';
import { BuildingOfficeIcon, BriefcaseIcon, DocumentTextIcon, ClockIcon, UserIcon, EnvelopeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const ActiveReferralsPage = () => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const email = user?.email;
                if (!email) {
                    setError('User not found. Please log in.');
                    setLoading(false);
                    return;
                }
                const data = await activeReferralService.getAll(email);
                setReferrals(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching active referrals:', err);
                setError('Failed to load active referrals.');
                setLoading(false);
            }
        };

        fetchReferrals();
    }, []);

    const handleDownloadResume = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user?.email;
            if (!email) {
                alert('User session not found. Please log in again.');
                return;
            }
            const downloadUrl = await activeReferralService.getResumeUrl(id, email);
            if (downloadUrl) {
                window.open(downloadUrl, '_blank');
            } else {
                alert('Could not retrieve resume URL.');
            }
        } catch (err) {
            console.error('Error fetching resume URL:', err);
            alert('Failed to get resume download link.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'REVIEWING':
                return 'bg-blue-100 text-blue-800';
            case 'ACCEPTED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <React.Fragment>
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Active Referrals</h1>
                    <p className="text-gray-500 mt-2">Track the status of referrals requested from you.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                        {error}
                    </div>
                ) : referrals.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Referrals</h3>
                        <p className="text-gray-500">You haven't requested any referrals yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {referrals.map((referral) => (
                            <div key={referral.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1" title={referral.jobRole}>{referral.jobRole}</h3>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                                        {referral.status || 'PENDING'}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6 flex-1">
                                    {referral.candidateName && (
                                        <div className="flex items-center text-sm font-medium text-gray-800">
                                            <UserIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                                            <span className="line-clamp-1" title={referral.candidateName}>{referral.candidateName}</span>
                                        </div>
                                    )}
                                    {referral.candidateEmail && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <EnvelopeIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                                            <span className="line-clamp-1" title={referral.candidateEmail}>{referral.candidateEmail}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center text-sm text-gray-600">
                                        <BuildingOfficeIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="line-clamp-1" title={referral.targetCompany}>{referral.targetCompany}</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-600">
                                        <DocumentTextIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-2" title={referral.description}>{referral.description}</span>
                                    </div>
                                    {referral.createdAt && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>{new Date(referral.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto border-t border-gray-50 pt-4 flex flex-col gap-3">
                                    {referral.resumeLink && (
                                        <a
                                            href={referral.resumeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center"
                                        >
                                            <DocumentTextIcon className="w-4 h-4 mr-1" />
                                            View Original Resume
                                        </a>
                                    )}
                                    <button
                                        onClick={() => handleDownloadResume(referral.id)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors"
                                    >
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                        Download Resume
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default ActiveReferralsPage;

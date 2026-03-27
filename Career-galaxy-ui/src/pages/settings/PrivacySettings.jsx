import React from 'react';

const PrivacySettings = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy & Security</h2>
            <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div className="pr-8">
                        <h3 className="font-medium text-gray-900 mb-1">Profile Visibility</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">Allow verified recruiters and employees to view your profile details and request connections.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full bg-purple-600 transition-colors">
                        <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="pr-8">
                        <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">Add an extra layer of security to your account by requiring a code when logging in.</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex-shrink-0">Enable 2FA</button>
                </div>
            </div>
        </div>
    );
};
export default PrivacySettings;

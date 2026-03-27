import React from 'react';

const AccountSettings = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-700" placeholder="John Doe" disabled />
                    <p className="text-xs text-gray-500 mt-2">Your name is synced with your identity provider.</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-700" placeholder="user@example.com" disabled />
                </div>
                <div className="pt-4 border-t border-gray-100 flex gap-4">
                    <button className="px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 transition-all opacity-50 cursor-not-allowed">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
export default AccountSettings;

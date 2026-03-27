import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const SettingsLayout = () => {
    return (
        <div className="max-w-5xl mx-auto py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <nav className="w-full md:w-64 flex flex-col gap-2">
                    <NavLink
                        to="/dashboard/settings"
                        end
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <UserCircleIcon className="w-5 h-5" /> Account
                    </NavLink>
                    <NavLink
                        to="/dashboard/settings/privacy"
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <ShieldCheckIcon className="w-5 h-5" /> Privacy
                    </NavLink>
                </nav>
                <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default SettingsLayout;

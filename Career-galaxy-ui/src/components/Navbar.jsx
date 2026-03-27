import React, { useEffect, useState } from 'react';
import {
    BellIcon,
    Bars3Icon
} from '@heroicons/react/24/outline';
import UserDropdown from './UserDropdown';

const Navbar = ({ onMenuClick }) => {
    const [user, setUser] = useState({ fullName: 'User' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && typeof storedUser === 'object') {
                setUser(storedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>

                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Welcome back, {(user?.name || user?.fullName || 'User').split(' ')[0]} 👋</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">Here's what's happening with your applications today.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                {loading ? (
                    <div className="w-32 h-10 bg-gray-100 rounded-full animate-pulse shadow-sm"></div>
                ) : (
                    <UserDropdown user={user} />
                )}
            </div>
        </header>
    );
};

export default Navbar;

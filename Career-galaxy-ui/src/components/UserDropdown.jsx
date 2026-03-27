import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import profileService from '../api/profileService';

const UserDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const userName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'User';
    const avatarUrl = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`;

    // Fetch technicalField from profile
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const email = user?.email;
                if (email) {
                    const profile = await profileService.getProfile(email);
                    if (profile?.technicalField) {
                        setUserRole(profile.technicalField);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch profile role:', error);
            }
        };
        fetchRole();
    }, [user?.email]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border transition-all duration-200 ${isOpen ? 'bg-gray-50 border-gray-200 shadow-sm' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
            >
                <img
                    src={avatarUrl}
                    alt={userName}
                    className="w-8 h-8 rounded-full bg-purple-100 object-cover"
                />
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">{userName}</p>
                    <p className="text-xs text-gray-500">{userRole}</p>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div 
                className={`absolute right-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden transition-all duration-200 origin-top-right ${
                    isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
            >
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <img
                            src={avatarUrl}
                            alt={userName}
                            className="w-10 h-10 rounded-full bg-purple-100 object-cover border border-white shadow-sm flex-shrink-0"
                        />
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <span className="text-sm font-bold text-gray-900 truncate" title={userName}>{userName}</span>
                            <span className="text-xs text-gray-500 truncate" title={user?.email || 'user@example.com'}>{user?.email || 'user@example.com'}</span>
                        </div>
                    </div>
                </div>

                <div className="p-2 space-y-1">
                    <button 
                        onClick={() => { setIsOpen(false); navigate('/dashboard/view-profile'); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                        <UserIcon className="w-5 h-5 text-gray-400" />
                        View Profile
                    </button>
                    <button 
                        onClick={() => { setIsOpen(false); navigate('/dashboard/profile'); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                        <PencilSquareIcon className="w-5 h-5 text-gray-400" />
                        Edit Profile
                    </button>
                    <button 
                        onClick={() => { setIsOpen(false); navigate('/dashboard/settings'); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                        <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
                        Settings
                    </button>
                </div>
                
                <div className="p-2 border-t border-gray-50">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UserIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
    RocketLaunchIcon,
    XMarkIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: <HomeIcon className="w-5 h-5" />, path: '/dashboard' },
        { name: 'Profile', icon: <UserIcon className="w-5 h-5" />, path: '/dashboard/profile' },
        { name: 'Active Referrals', icon: <BriefcaseIcon className="w-5 h-5" />, path: '/dashboard/referrals' },
        { name: 'Referral Posts', icon: <RocketLaunchIcon className="w-5 h-5" />, path: '/dashboard/referral-posts' },
        { name: 'My Applications', icon: <DocumentTextIcon className="w-5 h-5" />, path: '/dashboard/applications' },
        { name: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" />, path: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform transform bg-white border-r border-gray-100 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-[10%] px-6 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Career Galaxy Logo"
                            className="h-8 w-auto object-contain cursor-pointer"
                            onClick={() => navigate('/')}
                        />
                        <span className="text-xl font-bold text-gray-800 tracking-tight">Career Galaxy</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4 flex-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicked
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-purple-50 text-purple-600 font-medium shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {/* Icon Logic: cloneElement or just render */}
                            <span className="group-hover:text-gray-600">
                                {item.icon}
                            </span>
                            {item.name}
                        </NavLink>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-red-600 mt-2"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        Logout
                    </button>
                </nav>

                <div className="absolute bottom-8 w-full px-6">
                    <div className="p-4 bg-purple-50 rounded-2xl">
                        <h4 className="font-semibold text-purple-900 mb-1">Pro Plan</h4>
                        <p className="text-xs text-purple-600 mb-3">Get unlimited referrals</p>
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

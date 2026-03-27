import React from 'react';
import { RocketLaunchIcon, UserGroupIcon, ClipboardDocumentCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user?.name || 'User';

    const features = [
        {
            title: "Internal Referrals",
            description: "Connect directly with employees at top tech companies to get your foot in the door.",
            icon: <RocketLaunchIcon className="w-8 h-8 text-purple-600" />
        },
        {
            title: "Verified Networks",
            description: "Collaborate with a vetted community of professionals sharing genuine referral opportunities.",
            icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />
        },
        {
            title: "Track Status",
            description: "Stay updated on your application's progress with real-time tracking and notifications.",
            icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-green-600" />
        }
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-100px)] relative">
            <div className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Welcome back, {userName}!</h1>
                        <p className="text-purple-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Your bridge to opportunities. Career Galaxy connects driven job seekers with industry professionals for high-impact referrals.
                        </p>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* About Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
                        What is Career Galaxy?
                    </h2>
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Career Galaxy is a premier professional ecosystem designed to democratize access to the world's leading companies. We believe that a referral is more than just a recommendation—it's a validation of talent and a catalyst for career growth. Our platform empowers you to bypass traditional bottlenecks by connecting you directly with insiders who can champion your candidacy.
                        </p>
                        
                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition-colors shadow-sm group">
                                    <div className="mb-4 transform group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-start gap-4">
                        <div className="bg-purple-600 p-3 rounded-lg text-white">
                            <RocketLaunchIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-purple-900 text-lg mb-1">Looking for a Referral?</h3>
                            <p className="text-purple-700 text-sm">Explore our verified professionals network and find your next opportunity.</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                        <div className="bg-blue-600 p-3 rounded-lg text-white">
                            <UserGroupIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 text-lg mb-1">Help Someone Grow</h3>
                            <p className="text-blue-700 text-sm">Create a referral post and help talented candidates reach your company.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Footer */}
            <footer className="w-full mt-auto py-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xs ring-2 ring-purple-100">
                                CG
                            </div>
                            <span className="font-bold text-gray-900 text-lg">Career Galaxy Corp.</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">© 2026 Career Galaxy Corp. All Rights reserved</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-bold">Contact Support</p>
                        <a 
                            href="mailto:career.galaxy.corp@gmail.com" 
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-lg bg-purple-50 px-4 py-2 rounded-full transition-all hover:shadow-md"
                        >
                            <EnvelopeIcon className="w-5 h-5" />
                            career.galaxy.corp@gmail.com
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, CheckCircleIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import PricingCard from '../components/PricingCard';
import FounderCard from '../components/FounderCard';

const EXCHANGE_RATE = 83; // approx INR to USD
const PRO_INR = 50;
const PRO_USD = (PRO_INR / EXCHANGE_RATE).toFixed(2);
const PREMIUM_USD = (PRO_USD * 3).toFixed(2);

const pricingPlans = [
    { name: "Free", formattedPrice: "$0", features: ["1 Active Referral", "Basic Profile", "Community Support"] },
    { name: "Pro", formattedPrice: `$${PRO_USD}`, features: ["5 Active Referrals", "Priority Support", "Profile Highlights", "Resume Review"], popular: true },
    { name: "Premium", formattedPrice: `$${PREMIUM_USD}`, features: ["Unlimited Referrals", "Direct HR Intro", "Mock Interviews", "Dedicated Career Coach"] }
];

const founders = [
    { name: "Founder 1", role: "Co-Founder", bio: "Vision and strategy", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Founder 2", role: "CTO", bio: "Tech and product", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Founder 3", role: "COO", bio: "Operations expert", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Founder 4", role: "CMO", bio: "Marketing lead", image: "https://randomuser.me/api/portraits/women/4.jpg" }
];

const LandingPage = () => {
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src={logo}
                                alt="Career Galaxy Logo"
                                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Career Galaxy</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Features</a>
                            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Pricing</a>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-600 hover:text-purple-600 font-medium transition-colors">About</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register" className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full animate-fade-in">
                        🚀 Launch your career today
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                        Unlock Career Opportunities <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                            Through Referrals
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
                        Connect with industry insiders, get referred to top tech companies, and fast-track your job application process.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full text-lg shadow-xl shadow-purple-200 transition-all hover:-translate-y-1">
                            Get Started for Free
                        </Link>
                        <Link to="/auth" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold rounded-full text-lg shadow-sm transition-all hover:-translate-y-1">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Career Galaxy?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We bridge the gap between talented developers and hiring managers through trusted referrals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <CheckCircleIcon className="w-8 h-8 text-purple-600" />,
                                title: "Verified Referrals",
                                desc: "Get referred by verified employees active in the industry."
                            },
                            {
                                icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
                                title: "Direct Connections",
                                desc: "Skip the ATS black hole and get your resume in front of humans."
                            },
                            {
                                icon: <ChartBarIcon className="w-8 h-8 text-indigo-600" />,
                                title: "Track Progress",
                                desc: "Real-time updates on your referral status and application feedback."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="p-3 bg-white rounded-xl w-fit shadow-sm mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-gray-600">Choose the plan that fits your career goals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, idx) => (
                            <PricingCard key={idx} plan={plan} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Founders Section */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The team behind Career Galaxy, dedicated to transforming how tech talent connects with top companies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {founders.map((founder, idx) => (
                            <FounderCard key={idx} founder={founder} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={logo}
                                    alt="Career Galaxy Logo"
                                    className="h-8 w-auto object-contain"
                                />
                                <span className="text-lg font-bold">Career Galaxy</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Empowering developers to find their dream jobs through the power of community referrals.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Career Galaxy. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

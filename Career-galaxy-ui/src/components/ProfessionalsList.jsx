import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProfessionalCard from './ProfessionalCard';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const ProfessionalsList = () => {
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCompany, setFilterCompany] = useState('');

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await api.get('/professionals');
                setProfessionals(response.data);
            } catch (err) {
                console.error("Failed to fetch professionals", err);
                // Fallback mock data for UX demonstration if API doesn't exist yet
                setProfessionals([
                    {
                        id: 1,
                        name: "Rahul Sharma",
                        company: "Google",
                        role: "Software Engineer",
                        experience: "3 years",
                        skills: ["React", "DSA", "Node.js"],
                        referralsAvailable: true,
                        profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
                    },
                    {
                        id: 2,
                        name: "Priya Patel",
                        company: "Amazon",
                        role: "Frontend Developer",
                        experience: "5 years",
                        skills: ["JavaScript", "React", "AWS"],
                        referralsAvailable: true,
                        profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
                    },
                    {
                        id: 3,
                        name: "Amit Kumar",
                        company: "Microsoft",
                        role: "Backend Engineer",
                        experience: "4 years",
                        skills: ["C#", ".NET", "Azure"],
                        referralsAvailable: false,
                        profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
                    },
                    {
                        id: 4,
                        name: "Neha Singh",
                        company: "Atlassian",
                        role: "Product Designer",
                        experience: "6 years",
                        skills: ["UI/UX", "Figma", "User Research"],
                        referralsAvailable: true,
                        profileImage: "https://randomuser.me/api/portraits/women/68.jpg"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessionals();
    }, []);

    // Pro-level filters
    const filteredProfessionals = professionals.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompany = filterCompany ? p.company.toLowerCase() === filterCompany.toLowerCase() : true;
        return matchesSearch && matchesCompany;
    });

    const uniqueCompanies = [...new Set(professionals.map(p => p.company))];

    if (loading) {
        return (
            <div className="space-y-6 pt-6 mt-8 border-t border-gray-100">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="h-80 bg-gray-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-6 mt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Professionals Network</h2>
                    <p className="text-gray-500 text-sm mt-1">Connect with industry experts offering referrals.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search by name, role..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition-all"
                        />
                    </div>
                    <div className="relative group">
                        <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none" />
                        <select 
                            value={filterCompany}
                            onChange={(e) => setFilterCompany(e.target.value)}
                            className="w-full sm:w-48 pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none shadow-sm text-gray-700 cursor-pointer transition-all"
                        >
                            <option value="">All Companies</option>
                            {uniqueCompanies.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">{error}</div>}

            {filteredProfessionals.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                        <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No professionals found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProfessionals.map(pro => (
                        <ProfessionalCard key={pro.id} professional={pro} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfessionalsList;

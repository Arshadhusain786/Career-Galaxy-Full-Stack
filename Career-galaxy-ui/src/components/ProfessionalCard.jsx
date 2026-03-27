import React from 'react';
import { BriefcaseIcon, BuildingStorefrontIcon, StarIcon } from '@heroicons/react/24/outline';

const ProfessionalCard = ({ professional }) => {
    const handleRequest = () => {
        alert(`Referral request initiated for ${professional.name} at ${professional.company}.`);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <img 
                    src={professional.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(professional.name)}`} 
                    alt={professional.name} 
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-50 bg-gray-50 flex-shrink-0"
                />
                {professional.referralsAvailable ? (
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse relative before:absolute before:w-1.5 before:h-1.5 before:bg-green-500 before:rounded-full before:animate-ping"></span>
                        Available
                    </span>
                ) : (
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full border border-gray-200">
                        Busy
                    </span>
                )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={professional.name}>{professional.name}</h3>
            
            <div className="mt-2 space-y-2 mb-4">
                <p className="flex items-center text-sm text-gray-700 gap-2 font-medium">
                    <BuildingStorefrontIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="line-clamp-1">{professional.company}</span>
                </p>
                <p className="flex items-center text-sm text-gray-500 gap-2">
                    <BriefcaseIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="line-clamp-1">{professional.role}</span>
                </p>
                <p className="flex items-center text-sm text-gray-500 gap-2">
                    <StarIcon className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <span className="line-clamp-1">{professional.experience} Experience</span>
                </p>
            </div>

            <div className="mb-6 flex-1">
                <div className="flex flex-wrap gap-1.5">
                    {professional.skills?.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                            {skill}
                        </span>
                    ))}
                    {professional.skills?.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md border border-gray-100">
                            +{professional.skills.length - 3}
                        </span>
                    )}
                </div>
            </div>

            <button 
                onClick={handleRequest}
                disabled={!professional.referralsAvailable}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                    professional.referralsAvailable 
                        ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md active:scale-95' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
                {professional.referralsAvailable ? 'Request Referral' : 'Unavailable'}
            </button>
        </div>
    );
};

export default ProfessionalCard;

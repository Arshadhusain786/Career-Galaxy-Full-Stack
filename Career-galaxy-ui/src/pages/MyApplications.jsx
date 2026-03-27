import React from 'react';
import ReferralApplications from '../components/ReferralApplications';

const MyApplications = () => {
    return (
        <React.Fragment>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                    <p className="text-gray-500">Track all your referral applications in one place.</p>
                </div>
                <ReferralApplications />
            </div>
        </React.Fragment>
    );
};

export default MyApplications;

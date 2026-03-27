import React, { useState, useEffect, useRef } from 'react';
import { PencilSquareIcon, CameraIcon, DocumentArrowUpIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import profileService from '../api/profileService';

const ProfileOverview = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [downloadingResume, setDownloadingResume] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [resumeMessage, setResumeMessage] = useState({ type: '', text: '' });
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        dateOfBirth: '',
        technicalField: '',
        skills: '',
        company: '',
        jobRole: '',
        yearsOfExperience: '',
        degree: '',
        institution: '',
        graduationYear: ''
    });

    const fileInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.email) {
                    setUserEmail(storedUser.email);
                    await loadProfile(storedUser.email);
                } else {
                    setMessage({ type: 'error', text: 'User not found in local storage.' });
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                setMessage({ type: 'error', text: 'Failed to access user session.' });
                    setLoading(false);
                }
            };

        fetchUserAndProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProfile = async (email) => {
        try {
            setLoading(true);
            const data = await profileService.getProfile(email);
            console.log('Profile API response:', JSON.stringify(data, null, 2));

            // Helper: parse Java LocalDate (could be array [y,m,d], ISO string, or datetime string)
            const parseDob = (dob) => {
                if (!dob) return '';
                if (Array.isArray(dob)) {
                    // Java LocalDate serialized as [year, month, day]
                    const [y, m, d] = dob;
                    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                }
                return String(dob).split('T')[0]; // handles ISO string or datetime
            };

            if (data) {
                setProfile(data);
                setFormData({
                    phoneNumber: data.phoneNumber || '',
                    dateOfBirth: parseDob(data.dateOfBirth),
                    technicalField: data.technicalField || '',
                    skills: data.skills?.join(', ') || '',
                    company: data.company || data.currentCompanyName || '',
                    jobRole: data.jobTitle || data.currentJobTitle || '',
                    yearsOfExperience: data.totalExperienceYears || '',
                    degree: data.degree || '',
                    institution: data.collegeName || '',
                    graduationYear: data.graduationYear || ''
                });
            } else {
                setProfile(null);
            }
            setMessage({ type: '', text: '' });
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        if (!userEmail) return;
        
        try {
            setSaving(true);
            setMessage({ type: '', text: '' });
            
            const requestDto = {
                phoneNumber: formData.phoneNumber,
                dateOfBirth: formData.dateOfBirth,
                technicalField: formData.technicalField
            };

            await profileService.updateProfile(userEmail, requestDto);
            
            setMessage({ type: 'success', text: 'Profile saved successfully!' });
            await loadProfile(userEmail); // Refresh data
        } catch (error) {
            console.error('Error saving profile:', error);
            setMessage({ type: 'error', text: 'Failed to save profile.' });
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSkills = async () => {
        if (!userEmail) return;
        
        const rawSkills = formData.skills || '';
        const selectedSkills = rawSkills
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
            
        console.log("Email:", userEmail);
        console.log("Selected Skills:", selectedSkills);

        try {
            setSaving(true);
            await profileService.updateSkills(userEmail, { skills: selectedSkills });
            setMessage({ type: 'success', text: 'Skills saved successfully!' });
            await loadProfile(userEmail);
        } catch (error) {
            console.error('Error saving skills:', error);
            setMessage({ type: 'error', text: 'Failed to save skills.' });
        } finally {
            setSaving(false);
        }
    };

    const handleSaveProfessional = async () => {
        if (!userEmail) return;
        try {
            setSaving(true);
            await profileService.updateProfessionalDetails(userEmail, {
                company: formData.company,
                jobRole: formData.jobRole,
                yearsOfExperience: formData.yearsOfExperience
            });
            setMessage({ type: 'success', text: 'Professional details saved!' });
            await loadProfile(userEmail);
        } catch (error) {
            console.error('Error saving professional details:', error);
            setMessage({ type: 'error', text: 'Failed to save professional details.' });
        } finally {
            setSaving(false);
        }
    };

    const handleSaveEducation = async () => {
        if (!userEmail) return;
        try {
            setSaving(true);
            await profileService.updateEducationDetails(userEmail, {
                degree: formData.degree,
                institution: formData.institution,
                graduationYear: formData.graduationYear
            });
            setMessage({ type: 'success', text: 'Education details saved!' });
            await loadProfile(userEmail);
        } catch (error) {
            console.error('Error saving education details:', error);
            setMessage({ type: 'error', text: 'Failed to save education details.' });
        } finally {
            setSaving(false);
        }
    };

    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !userEmail) return;

        try {
            setSaving(true);
            await profileService.uploadProfilePicture(userEmail, file);
            setMessage({ type: 'success', text: 'Profile picture uploaded successfully!' });
            await loadProfile(userEmail);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            setMessage({ type: 'error', text: 'Failed to upload profile picture.' });
        } finally {
            setSaving(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !userEmail) return;

        // Validation for PDF
        if (file.type !== 'application/pdf') {
            setResumeMessage({ type: 'error', text: 'Please upload a PDF file for the resume.' });
            return;
        }

        try {
            setUploadingResume(true);
            
            if (profile?.resumeDownloadUrl) {
                await profileService.updateResume(userEmail, file);
            } else {
                await profileService.uploadResume(userEmail, file);
            }
            
            setResumeMessage({ type: 'success', text: 'Resume uploaded successfully!' });
            await loadProfile(userEmail);
        } catch (error) {
            console.error('Error uploading resume:', error);
            setResumeMessage({ type: 'error', text: 'Failed to upload resume.' });
        } finally {
            setUploadingResume(false);
            if (resumeInputRef.current) resumeInputRef.current.value = '';
        }
    };

    const handleResumeDownload = async () => {
        if (!userEmail) return;
        
        try {
            setDownloadingResume(true);
            setResumeMessage({ type: '', text: '' });
            
            const { data, filename } = await profileService.downloadResume(userEmail);
            
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename || profile?.resumeFileName || 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            setResumeMessage({ type: 'success', text: 'Resume downloaded successfully!' });
        } catch (error) {
            console.error('Error downloading resume:', error);
            setResumeMessage({ type: 'error', text: 'Failed to download resume.' });
        } finally {
            setDownloadingResume(false);
        }
    };

    const calculateAge = (dobString) => {
        if (!dobString) return 'Not Provided';
        const today = new Date();
        const birthDate = new Date(dobString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const completionPercentage = () => {
        let score = 10; // Base score
        if (profile?.profileImageUrl) score += 15;
        if (profile?.resumeDownloadUrl) score += 15;
        if (profile?.phoneNumber) score += 10;
        if (profile?.dateOfBirth) score += 10;
        if (profile?.technicalField) score += 10;
        if (profile?.skills?.length > 0) score += 10;
        if (profile?.professionalDetails?.company) score += 10;
        if (profile?.educationDetails?.degree) score += 10;
        return Math.min(score, 100);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-center items-center h-64 animate-fade-in">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Profile Overview</h2>
                    <p className="text-sm text-gray-500">
                        {completionPercentage()}% Completed
                    </p>
                </div>
                <button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </div>

            {/* Messages */}
            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {message.text}
                </div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${completionPercentage()}%` }}>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="w-full md:w-auto flex flex-col items-center gap-3">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src={profile?.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail || 'default'}`}
                                alt="Profile"
                                className="w-full h-full object-cover bg-purple-50"
                            />
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={saving}
                            className="absolute bottom-1 right-1 p-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-colors disabled:opacity-50">
                            <CameraIcon className="w-4 h-4" />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleProfilePictureUpload} 
                            accept="image/jpeg, image/png, image/jpg"
                            className="hidden" 
                        />
                    </div>
                    <p className="text-sm text-gray-500">Allowed *.jpeg, *.jpg, *.png</p>
                </div>

                {/* Details Section */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="+91 98765 43210"
                                className="w-full p-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                            <div className="flex items-center gap-4">
                                <div 
                                    onClick={() => !uploadingResume && !downloadingResume && resumeInputRef.current?.click()}
                                    className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${uploadingResume || downloadingResume ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                                    {uploadingResume ? (
                                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                                    ) : (
                                        <DocumentArrowUpIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    )}
                                    <span className="text-sm text-gray-500">
                                        {uploadingResume ? 'Uploading...' : profile?.resumeDownloadUrl ? 'Update PDF' : 'Upload PDF'}
                                    </span>
                                </div>
                                
                                <div 
                                    onClick={!uploadingResume && !downloadingResume ? handleResumeDownload : undefined}
                                    className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${uploadingResume || downloadingResume ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                                    {downloadingResume ? (
                                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                                    ) : (
                                        <DocumentArrowDownIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    )}
                                    <span className="text-sm text-gray-500">
                                        {downloadingResume ? 'Downloading...' : 'Download PDF'}
                                    </span>
                                </div>
                            </div>
                            <input 
                                type="file" 
                                ref={resumeInputRef} 
                                onChange={handleResumeUpload} 
                                accept="application/pdf"
                                className="hidden" 
                            />
                            {resumeMessage.text && (
                                <div className={`mt-3 p-2 rounded-lg text-sm text-center ${resumeMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    {resumeMessage.text}
                                </div>
                            )}
                            {profile?.resumeDownloadUrl && !resumeMessage.text && (
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Current: <span className="font-medium text-gray-700">{profile?.resumeFileName || 'Resume.pdf'}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Technical Field</label>
                            <select 
                                name="technicalField"
                                value={formData.technicalField}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-50 rounded-lg text-gray-800 border border-transparent focus:border-purple-300 focus:bg-white focus:ring-0 transition-colors outline-none">
                                <option value="">Select</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="AI/ML Engineer">AI/ML Engineer</option>
                                <option value="Data Scientist">Data Scientist</option>
                            </select>
                        </div>

                        {/* Calculated Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <div className="p-3 bg-gray-50 rounded-lg text-gray-500 select-none">
                                {formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <hr className="my-8 border-gray-100" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Skills</h3>
                        <button 
                            onClick={handleSaveSkills}
                            disabled={saving}
                            className="text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50">
                            Save Skills
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Top Skills (Comma Separated)</label>
                        <textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            placeholder="e.g. React, Node.js, System Design"
                            rows={3}
                            className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Professional Details */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Professional Experience</h3>
                        <button 
                            onClick={handleSaveProfessional}
                            disabled={saving}
                            className="text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50">
                            Save Experience
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="e.g. Google"
                                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                <input
                                    type="text"
                                    name="jobRole"
                                    value={formData.jobRole}
                                    onChange={handleInputChange}
                                    placeholder="e.g. SDE II"
                                    className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Years (Exp)</label>
                                <input
                                    type="number"
                                    name="yearsOfExperience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 3"
                                    className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Details */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Education Details</h3>
                        <button 
                            onClick={handleSaveEducation}
                            disabled={saving}
                            className="text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50">
                            Save Education
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleInputChange}
                                placeholder="e.g. B.Tech Computer Science"
                                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                                type="text"
                                name="institution"
                                value={formData.institution}
                                onChange={handleInputChange}
                                placeholder="e.g. MIT"
                                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="number"
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                placeholder="e.g. 2024"
                                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-300 focus:ring-0 transition-colors outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;

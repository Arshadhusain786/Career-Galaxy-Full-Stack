import api from './axios';

const profileService = {
  getProfile: async (email) => {
    try {
      const response = await api.get(`/profiles?email=${email}`);
      const data = response.data;
      if (Array.isArray(data)) {
        return data.find(p => p.email === email || p.userEmail === email) || (data.length > 0 ? data[0] : null);
      }
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  createProfile: async (email, requestDto) => {
    const response = await api.post(`/profiles?email=${email}`, requestDto);
    return response.data;
  },

  updateProfile: async (email, requestDto) => {
    const response = await api.put(`/profiles?email=${email}`, requestDto);
    return response.data;
  },

  uploadResume: async (email, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/profiles/resume?email=${email}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateResume: async (email, file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await api.put(`/profiles/resume?email=${email}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  downloadResume: async (email) => {
    const response = await api.get(`/profiles/resume/byuseremail?email=${email}`, {
      responseType: 'blob'
    });
    
    let filename = 'resume.pdf'; // DEFAULT FALLBACK
    
    // Safely get the header from Axios (supports both native object and AxiosHeaders object)
    const disposition = response.headers['content-disposition'] 
                     || (typeof response.headers.get === 'function' && response.headers.get('content-disposition'));
                     
    // Debugging logs to help you see if CORS is hiding the headers from React!
    console.log("Raw Axios Headers object:", response.headers);
    console.log("Extracted Content-Disposition header:", disposition);
    
    if (disposition) {
      const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
      const utf8Match = disposition.match(/filename\*=UTF-8''([^;\n]+)/i);
      if (utf8Match && utf8Match.length === 2) {
        filename = decodeURIComponent(utf8Match[1]);
      }
    } else {
      console.warn("WARNING: The browser hid 'Content-Disposition' from Javascript because your Spring Boot backend did not add it to '.exposedHeaders()'. Falling back to 'resume.pdf'.");
    }
    
    return { data: response.data, filename };
  },

  uploadProfilePicture: async (email, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/profiles/profile-picture?email=${email}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateSkills: async (email, skillsDto) => {
    const response = await api.put(`/profiles/skills?email=${email}`, skillsDto);
    return response.data;
  },

  updateProfessionalDetails: async (email, professionalDto) => {
    const response = await api.put(`/profiles/professional?email=${email}`, professionalDto);
    return response.data;
  },

  updateEducationDetails: async (email, educationDto) => {
    const response = await api.put(`/profiles/education?email=${email}`, educationDto);
    return response.data;
  }
};

export default profileService;

import api from './axios';

const activeReferralService = {
  getAll: async (email) => {
    try {
      const response = await api.get('/active-referrals/get-all', {
        params: { email }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getResumeUrl: async (id, userEmail) => {
    try {
      const response = await api.get(`/active-referrals/${id}/resume-url`, {
        params: { userEmail }
      });
      return response.data.downloadUrl;
    } catch (error) {
      throw error;
    }
  }
};

export default activeReferralService;

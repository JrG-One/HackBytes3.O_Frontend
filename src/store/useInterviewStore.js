import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useInterviewStore = create((set) => ({
  interviews: [],
  isLoading: false,
  fetchUserInterviews: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/interview');
      set({ interviews: res.data });
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
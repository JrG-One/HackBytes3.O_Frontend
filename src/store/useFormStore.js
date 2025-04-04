import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

export const useFormStore = create((set, get) => ({
  formData: {
    name: "",
    company: "",
    role: "",
    experience: "",
    prefferedLanguage: "",
    codingRound: false,
  },

  interviewId: null,

  setFormData: async (data) => {
    try {
      console.log("Sending data:", data);
      const response = await axiosInstance.post("/interview/", data);
      console.log("Response received:", response.data);

      set((state) => {
        const updatedFormData = { ...state.formData, ...data };
        console.log("Updated formData state:", updatedFormData);
        return {
          formData: updatedFormData,
          interviewId: response.data.interviewId,
        };
      });

      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  },
}));

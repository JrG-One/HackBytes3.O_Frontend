import { useEffect } from "react";
import PersonalInfo from "../components/profilePage/PersonalInfo";
import InterviewStats from "../components/profilePage/InterviewStats";
import { useAuthStore } from "../store/useAuthStore";
import { useInterviewStore } from "../store/useInterviewStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { interviews, fetchUserInterviews, isLoading } = useInterviewStore();

  useEffect(() => {
    fetchUserInterviews(); // Fetch interviews on mount
  }, []);

  return (
    <div className="w-full p-4">
      {/* Personal Info */}
      <PersonalInfo atsScore={authUser?.atsScore || 0} />

      {/* Interview Stats */}
      {isLoading ? (
        <p className="text-gray-500 text-center mt-4">Loading interviews...</p>
      ) : interviews.length > 0 ? (
        <InterviewStats interviews={interviews} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No interview data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
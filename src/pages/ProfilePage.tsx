import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/user.context";

const ProfilePage = () => {
  const { loggedInUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !loggedInUser) {
      navigate("/");
    }
  }, [isLoading, loggedInUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="relative h-screen">
      <img
        src="src/images/cc4f51f85f7374fbadac3f90f89a0d06.jpg"
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center h-full relative z-10 ">
          <div className="w-[800px] h-[450px] flex">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 gradient-teal rounded-3xl">
                <div className="w-full h-full p-12 space-y-5 rounded-3xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-90">
                  <h3 className="font-bold text-white text-xl">Profile</h3>
                  <h1 className="font-bold text-white text-3xl">
                    Welcome, {loggedInUser.fullName}!
                  </h1>
                  <p className="text-white text-lg">
                    Email: {loggedInUser.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

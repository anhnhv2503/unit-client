import EditProfile from "@/components/common/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/services/authService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatePost } from "../common/CreatePost";

type UserProfileProps = {
  UserId: string;
  UserName: string;
  Bio: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Private: boolean;
  ProfilePicture: string;
};

export const UserProfile = () => {
  const { id } = useParams();
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfileProps>({
    UserId: "",
    UserName: "",
    Bio: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Private: false,
    ProfilePicture: "",
  });
  const [isFollow, setIsFollow] = useState(false);
  const isLogin = JSON.parse(localStorage.getItem("user_id")!) === id;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (user.UserId) {
      setModalOpen(true);
    } else {
      console.log("User data is not yet loaded.");
    }
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const getUserProfileData = async () => {
      const response = await getUserProfile(id!, isLogin);
      if (!response.data.ProfilePicture) {
        setUser({
          ...response.data,
          ProfilePicture: "https://github.com/shadcn.png",
        });
      } else {
        setUser({
          ...response.data,
          ProfilePicture: `${
            response.data.ProfilePicture
          }?t=${new Date().getTime()}`, // Add timestamp
        });
      }

      console.log(response);
    };
    getUserProfileData();
  }, [isModalOpen, id]);

  const handleFollowUser = () => {
    setIsFollow(!isFollow);
  };

  console.log(user.ProfilePicture);

  // const content = data?.map((posts: PostProps, index) => (
  //   <Post key={index} post={posts} innerRef={ref} />
  // ));

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-screen overflow-y-scroll no-scrollbar">
      <div className="h-full w-4/5 lg:w-2/5">
        <div className="max-w-2xl mt-4">
          <div className="bg-white p-4 rounded-lg border dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-black dark:text-white text-xl lg:text-2xl">
                  {user.UserName}
                </div>
                <div className="text-gray-300 text-sm mt-2">{user.Bio}</div>
              </div>
              <Avatar className="w-12 h-12 lg:w-24 lg:h-24">
                <AvatarImage
                  src={
                    user.ProfilePicture !== null
                      ? user.ProfilePicture
                      : "https://github.com/shadcn.png"
                  }
                  alt="@UserAvatar"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            {isLogin ? (
              <>
                <div
                  onClick={openModal}
                  className="mt-20 p-2 text-center rounded-lg border cursor-pointer dark:text-white dark:border-white"
                >
                  Edit Profile
                  {isModalOpen && (
                    <EditProfile
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      // onSave={handleSave}
                      initialData={user}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                {isFollow ? (
                  <>
                    {" "}
                    <div
                      className="mt-20 p-2 text-center rounded-lg border  cursor-pointer dark:text-white dark:border-white"
                      onClick={handleFollowUser}
                    >
                      Following
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div
                      className="mt-20 p-2 text-center bg-black text-white rounded-lg cursor-pointer dark:bg-white dark:text-black"
                      onClick={handleFollowUser}
                    >
                      Follow
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="max-w-2xl">
          <div>
            <CreatePost />
          </div>
          {/* {isLoading ? (
            <>
              <div className="flex justify-center my-10">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
};

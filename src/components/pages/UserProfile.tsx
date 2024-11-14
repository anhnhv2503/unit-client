import EditProfile from "@/components/common/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/services/authService";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

type UserProfileProps = {
  UserId: string;
  UserName: string;
  Bio: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Private: boolean;
};

export const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfileProps>({
    UserId: "",
    UserName: "",
    Bio: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Private: false,
  });
  const [isFollow, setIsFollow] = useState(false);
  const { ref } = useInView();
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

  const handleSave = (data: {
    UserId: string;
    UserName: string;
    Bio: string;
    PhoneNumber: string;
    DateOfBirth: string;
    Private: boolean;
  }) => {
    setUser(data);
  };

  useEffect(() => {
    const getUserProfileData = async () => {
      const response = await getUserProfile(id!, isLogin);
      setUser(response.data);
      console.log(response);
    };
    getUserProfileData();
  }, [id]);

  const handleFollowUser = () => {
    setIsFollow(!isFollow);
  };

  // const content = data?.map((posts: PostProps, index) => (
  //   <Post key={index} post={posts} innerRef={ref} />
  // ));

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <div className="max-w-2xl mt-4">
          <div className="bg-white p-4 rounded-lg border dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-black dark:text-white text-2xl"></div>
                <div className="text-black dark:text-white text-sm">
                  {user.UserName}
                </div>
                <div className="text-gray-300 text-sm">{user.Bio}</div>
              </div>
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@UserAvatar"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            {isLogin ? (
              <>
                <div>
                  <Button onClick={openModal}>Edit Profile</Button>
                  {isModalOpen && (
                    <EditProfile
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      onSave={handleSave}
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
          {isLoading ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

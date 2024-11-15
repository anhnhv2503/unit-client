import EditProfile from "@/components/common/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/services/authService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatePost } from "../common/CreatePost";
import { getPostByUserId } from "@/services/postService";
import { Post } from "@/components/common/Post";
import { PostProps } from "@/types";
import Loading from "@/components/common/loading/Loading";
import { useDocumentTitle } from "@uidotdev/usehooks";

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
  useDocumentTitle("My Profile - UNIT");
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
        }?t=${new Date().getTime()}`,
      });
    }
  };

  const getPostsByUserIdData = async () => {
    try {
      setIsLoading(true);
      const response = await getPostByUserId(id!);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfileData();
    getPostsByUserIdData();
  }, [id]);

  const handleFollowUser = () => {
    setIsFollow(!isFollow);
  };

  const content = data?.map((posts: PostProps, index) => (
    <Post key={index} post={posts} />
  ));

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
                  className="mt-20 p-2 font-semibold text-center rounded-lg border cursor-pointer bg-black text-white dark:text-black dark:bg-white"
                >
                  Edit Profile
                </div>
                {isModalOpen && (
                  <EditProfile
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    // onSave={handleSave}
                    initialData={user}
                  />
                )}
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
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
      </div>
    </div>
  );
};

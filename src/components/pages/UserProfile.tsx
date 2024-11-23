import EditProfile from "@/components/common/EditProfile";
import Loading from "@/components/common/loading/Loading";
import { Post } from "@/components/common/Post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/services/authService";
import { getPostByUserId } from "@/services/postService";
import { PostProps } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
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
  useDocumentTitle("My Profile - UNIT");
  const { id } = useParams();
  const { ref, inView } = useInView();
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
  const [userLoaded, setUserLoaded] = useState(false);

  const openModal = () => {
    if (user.UserId) {
      setModalOpen(true);
    } else {
      console.log("User data is not yet loaded.");
    }
  };
  const closeModal = () => setModalOpen(false);

  const getUserProfileData = async () => {
    try {
      const response = await getUserProfile(id!, isLogin);
      const profileData = response.data;
      setUser({
        ...profileData,
        ProfilePicture:
          profileData.ProfilePicture ?? "https://github.com/shadcn.png",
      });
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    } finally {
      setUserLoaded(true); // Mark user data as fully loaded
    }
  };

  const fetchPosts = async ({ pageParam }: { pageParam: string }) => {
    if (user.Private) throw new Error("This user profile is private.");
    const res = await getPostByUserId(id!, pageParam);
    return res;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts", id],
    queryFn: fetchPosts,
    enabled: userLoaded && !user.Private,
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const parsedResponse = JSON.parse(lastPage.headers["x-pagination"]);

      return parsedResponse.NextPageKey;
    },
  });

  useEffect(() => {
    getUserProfileData();
  }, [isModalOpen, id]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const handleFollowUser = () => {
    setIsFollow(!isFollow);
  };

  if (!userLoaded) return <Loading />;

  if (user.Private)
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
          <div className="max-w-2xl text-center mt-3">
            This profile is private.
          </div>
        </div>
      </div>
    );

  if (status === "pending") return <Loading />;
  if (status === "error")
    return (
      <div className="text-center text-red-500">
        {user.Private ? "This profile is private." : `Error: ${error.message}`}
      </div>
    );

  const content = data.pages.map((page) => {
    return page.data.map((post: PostProps) => {
      const currentPost = { ...post, profilePicture: user.ProfilePicture };
      return <Post key={post.postId} post={currentPost} innerRef={ref} />;
    });
  });

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
            <CreatePost avatar={user.ProfilePicture} onRefresh={refetch} />
          </div>
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {isFetchingNextPage && <Loading />}
              <>{content}</>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

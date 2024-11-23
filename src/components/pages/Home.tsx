import Loading from "@/components/common/loading/Loading";
import { getUserAvatar } from "@/services/authService";
import { getPosts } from "@/services/postService";
import { PostProps } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CreatePost } from "../common/CreatePost";
import { Post } from "../common/Post";
import { useWebSocket } from "../context/NotificationProvider";

const Home = () => {
  useDocumentTitle("Home - UNIT");
  const { ref, inView } = useInView();
  const [userAvatar, setUserAvatar] = useState<string>("");
  const { connect, messages } = useWebSocket();

  useEffect(() => {
    if (connect) {
      connect();
    }
  }, []);

  console.log(messages);

  const fetchPosts = async ({ pageParam }: { pageParam: string }) => {
    const res = await getPosts(pageParam);
    return res;
  };

  const getAvatar = async () => {
    const response = await getUserAvatar();
    setUserAvatar(response.data.ProfilePicture);
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
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const parsedResponse = JSON.parse(lastPage.headers["x-pagination"]);

      return parsedResponse.NextPageKey;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    // refetch();
    getAvatar();
    // Additional logic (e.g., reset states, refetch data, etc.)
  }, []);

  if (status === "pending") return <Loading />;
  if (status === "error") return <div>Error: {error.message}</div>;

  const content = data.pages.map((page) => {
    return page.data.map((post: PostProps) => {
      return <Post key={post.postId} post={post} innerRef={ref} />;
    });
  });

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <CreatePost avatar={userAvatar} onRefresh={refetch} />
            {content}
          </>
        )}

        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  );
};

export default Home;

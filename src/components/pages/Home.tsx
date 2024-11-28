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

const Home = () => {
  useDocumentTitle("Home - UNIT");
  const { ref, inView } = useInView();
  const [userAvatar, setUserAvatar] = useState<string>("");

  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const res = await getPosts(pageParam);
    return res;
  };

  const getAvatar = async () => {
    const response = await getUserAvatar();
    setUserAvatar(response.data.ProfilePicture);
  };

  const { data, status, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage =
          lastPage.data.length > 0 ? allPage.length + 1 : undefined;
        return nextPage;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    getAvatar();
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
      <div className="h-full w-4/5 lg:w-1/2">
        <CreatePost avatar={userAvatar} onRefresh={refetch} />
        {content}
      </div>
    </div>
  );
};

export default Home;

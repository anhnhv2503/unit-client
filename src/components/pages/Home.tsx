import Loading from "@/components/common/loading/Loading";
import { getPosts } from "@/services/postService";
import { PostProps } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CreatePost } from "../common/CreatePost";
import { Post } from "../common/Post";

const Home = () => {
  useDocumentTitle("Home - UNIT");
  const { ref, inView } = useInView();

  const fetchPosts = async () => {
    const res = await getPosts();
    return res.data;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length > 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, data]);

  if (status === "pending") return <Loading />;
  if (status === "error") return <div>Error: {error.message}</div>;

  const content = data?.pages.map((posts: PostProps[]) =>
    posts.map((post) => {
      return <Post key={post.postId} post={post} innerRef={ref} />;
    })
  );

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <CreatePost />
        {content}

        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  );
};

export default Home;

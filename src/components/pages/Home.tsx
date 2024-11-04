import { useDocumentTitle } from "@uidotdev/usehooks";
import { Post } from "../common/Post";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PostProps } from "@/types";
import { CreatePost } from "../common/CreatePost";

const Home = () => {
  useDocumentTitle("Unit");
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`
    );
    return response.data;
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
  }, [inView, hasNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  const content = data?.pages.map((posts: PostProps[]) =>
    posts.map((post) => {
      return <Post key={post.id} post={post} innerRef={ref} />;
    })
  );

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-zinc-950 h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <CreatePost />
        {content}
        <div className="">{isFetchingNextPage && <span>Loading...</span>}</div>
      </div>
    </div>
  );
};

export default Home;

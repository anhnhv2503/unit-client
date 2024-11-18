import Loading from "@/components/common/loading/Loading";
import { Post } from "@/components/common/Post";
import { Reply } from "@/components/common/Reply";
import { Button } from "@/components/ui/button";
import { getCommentsByPostId } from "@/services/commentService";
import { getPostDetail } from "@/services/postService";
import { CommentResponse, PostProps } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PostDetail = () => {
  const nav = useNavigate();
  const [param] = useSearchParams();
  const postId = param.get("postId");
  const userId = param.get("userId");
  const [isLoading, setIsLoading] = useState(true);

  const [post, setPost] = useState<PostProps>({
    userId: "",
    postId: "",
    content: "",
    media: [],
    createdAt: "",
    lastModified: "",
    isHidden: false,
    likeCount: 0,
    commentCount: 0,
    reactions: [],
  });

  const [comments, setComments] = useState<CommentResponse[]>([]);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await getPostDetail(postId!, userId!);
      setPost(response.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(true);
    }
  };

  const getComments = async () => {
    setIsLoading(true);
    try {
      const response = await getCommentsByPostId(postId!);
      setComments(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, [postId, userId]);

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-full overflow-y-scroll no-scrollbar">
      <div className="h-full w-4/5 lg:w-2/5">
        <div className="max-w-2xl mt-4">
          <div className="top-4 left-4">
            <Button
              onClick={() => nav(-1)}
              className="bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="">
          {isLoading ? <Loading /> : <Post post={post} />}
          {comments.length > 0 ? (
            <h2 className="text-lg font-semibold mt-4">Comments</h2>
          ) : (
            <h2 className="text-lg font-semibold mt-4 text-gray-500 text-center">
              No comments yet
            </h2>
          )}
          {comments.map((comment) => (
            <Reply key={comment.CommentId} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

import SmallLoading from "@/components/common/loading/SmallLoading";
import { Post } from "@/components/common/Post";
import { Reply } from "@/components/common/Reply";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment, getCommentsByPostId } from "@/services/commentService";
import { getPostDetail } from "@/services/postService";
import { CommentResponse, PostProps } from "@/types";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
    isLiked: false,
  });

  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [content, setContent] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

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

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCommentLoading(true);
      const response = await createComment(postId!, {
        content,
        userId: userId!,
      });
      if (response.status === 200) {
        setContent("");
        toast.success("Comment Posted");
        setCommentLoading(false);
        getComments();
      }
    } catch (error) {
      setCommentLoading(true);
      console.error(error);
    }
  };

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
          {isLoading ? <SmallLoading /> : <Post post={post} />}
          <div className="max-w-2xl mt-2 rounded-3xl w-full">
            <div className="bg-white dark:bg-black p-4 shadow rounded-3xl">
              <form onSubmit={handleComment} className="flex flex-col gap-4">
                <Textarea
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-gray-300"
                  rows={1}
                  placeholder="Write your comment here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="self-end bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!content.trim() || commentLoading}
                >
                  <PaperAirplaneIcon
                    aria-hidden="true"
                    className="h-6 w-6 mr-1 cursor-pointer no-nav"
                  />
                </Button>
              </form>
            </div>
          </div>
          {comments.length > 0 ? (
            <h2 className="text-lg font-semibold">Comments</h2>
          ) : (
            <h2 className="text-lg font-semibold text-gray-500 text-center">
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

import { PostProps, ReplyProps } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../common/Post";
import { Reply } from "../common/Reply";
import Loading from "@/components/common/loading/Loading";

export const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostProps>({
    id: "",
    title: "",
    userId: "",
  });

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      });
  }, []);

  const replys = data?.map((reply: ReplyProps) => {
    return (
      <Reply
        key={reply.id}
        id={reply.id}
        body={reply.body}
        email={reply.email}
      />
    );
  });

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white dark:bg-black h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <div className="max-w-2xl mt-4">
          <Post key={post.id} post={post} />

          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>{replys}</>
          )}
        </div>
      </div>
    </div>
  );
};

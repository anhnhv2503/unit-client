import { ReplyProps } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../common/Post";
import { Reply } from "../common/Reply";

export const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});

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
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-zinc-950 h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <div className="max-w-2xl mt-4">
          <Post key={post.id} post={post} />

          {isLoading ? (
            <>
              {" "}
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
                    stroke-width="4"
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
            <>{replys}</>
          )}
        </div>
      </div>
    </div>
  );
};

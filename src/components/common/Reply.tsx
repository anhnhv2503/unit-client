import React, { useRef, useState } from "react";
import Comment from "./Comment";
import { HeartIcon } from "@heroicons/react/24/outline";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

type ReplyProps = {
  id: string;
  body: string;
  email: string;
};

export const Reply: React.FC<ReplyProps> = ({ id, body, email }) => {
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      likeRef.current -= 1;
      setLikeCount(likeRef.current);
    } else {
      likeRef.current += 1;
      setLikeCount(likeRef.current);
    }
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 p-4 shadow border mt-1 rounded-md"
      id={id}
    >
      <div className="flex items-top mb-2">
        <div className="flex-none w-10 h-10 mr-2">
          <img
            src={fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
        <div>
          <div className="font-semibold dark:text-white">
            {email}{" "}
            <span className="text-sm text-gray-500 font-normal">1d</span>
          </div>
          <div className="dark:text-white">{body}</div>
        </div>
      </div>

      <div className="flex items-center mt-2 text-gray-500 text-sm ">
        <div className="flex items-center mr-4">
          <HeartIcon
            onClick={handleLike}
            aria-hidden="true"
            className="h-6 w-6 mr-1 cursor-pointer"
            {...(isLiked ? { fill: "red", color: "red" } : { fill: "none" })}
          />
          {likeCount}
        </div>

        <Comment />

        <div className="flex items-center">
          <i className="fas fa-share mr-1"></i>
        </div>
      </div>
    </div>
  );
};

import { CommentResponse } from "@/types";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const fakeAvt = `https://github.com/shadcn.png`;

export const Reply: React.FC<CommentResponse> = ({
  CommentId,
  Content,
  AuthorUserName,
  CreatedAt,
  AuthorId,
  AuthorProfilePicture,
}) => {
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const nav = useNavigate();

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

  const calculateTime = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const secondsAgo = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (secondsAgo < 3600) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hours = Math.floor(secondsAgo / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} `;
    } else if (secondsAgo < 2592000) {
      const days = Math.floor(secondsAgo / 86400);
      return `${days} day${days > 1 ? "s" : ""} `;
    } else if (secondsAgo < 31536000) {
      const months = Math.floor(secondsAgo / 2592000);
      return `${months} month${months > 1 ? "s" : ""} `;
    } else {
      const years = Math.floor(secondsAgo / 31536000);
      return `${years} year${years > 1 ? "s" : ""} `;
    }
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 p-4 shadow border dark:border-b-gray-500 rounded-sm"
      id={CommentId}
    >
      <div className="flex items-top mb-2">
        <div className="flex-none w-10 h-10 mr-2">
          <img
            src={AuthorProfilePicture || fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
        <div>
          <div
            className="font-semibold dark:text-white cursor-pointer"
            onClick={() => nav(`/user-profile/${AuthorId}`)}
          >
            <span className="hover:text-indigo-400">{AuthorUserName} </span>
            <span className="text-sm text-gray-500 font-normal">
              {calculateTime(CreatedAt)}
            </span>
          </div>
          <div className="dark:text-white">{Content}</div>
        </div>
      </div>

      <div className="flex items-center mt-2 text-gray-500 text-sm ">
        <div className="flex items-center mr-4"></div>

        <div className="flex items-center">
          <i className="fas fa-share mr-1"></i>
        </div>
      </div>
    </div>
  );
};

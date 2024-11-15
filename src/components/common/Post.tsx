import ImagePreview from "@/components/common/ImagePreview";
import { MediaItem, PostProp } from "@/types";
import { HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FC, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Comment from "./Comment";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

export const Post: FC<PostProp> = ({ post, innerRef, ...props }) => {
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const nav = useNavigate();

  const processMedia = (media: string[]): MediaItem[] => {
    return media.map((url) => ({
      url,
      type: url.endsWith(".mp4") || url.endsWith(".mov") ? "video" : "image",
    }));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.dataset.isDragging = "true";
      scrollContainerRef.current.dataset.startX = (
        e.pageX - scrollContainerRef.current.offsetLeft
      ).toString();
      scrollContainerRef.current.dataset.scrollLeft =
        scrollContainerRef.current.scrollLeft.toString();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current?.dataset.isDragging !== "true") return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const startX = Number(scrollContainerRef.current.dataset.startX);
      const scrollLeft = Number(scrollContainerRef.current.dataset.scrollLeft);
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = x - startX;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.dataset.isDragging = "false";
    }
  };

  const handleImageClick = (images: string[]) => {
    setSelectedImage(images);
    setIsModalOpen(true);
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleMainClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest(".no-nav")) {
      nav(`/post/${post.postId}`);
    }
  };

  const handleSharePost = () => {
    toast.success("Post shared to your newsfeed!");
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
      className="max-w-2xl mt-3 rounded-3xl"
      key={post.postId}
      ref={innerRef}
      {...props}
    >
      <div
        className="bg-white dark:bg-zinc-800 p-4 shadow  border cursor-pointer rounded-2xl"
        onClick={handleMainClick}
      >
        <div className="flex items-center mb-2 ">
          <img
            src={post.profilePicture || fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2 no-nav"
          />
          <div
            className="no-nav"
            onClick={() => {
              nav(`/user-profile/${post.userId}`);
            }}
          >
            <div className="font-semibold dark:text-white text-black">
              {post.userName || "UNIT User"}
            </div>
            <div className="text-gray-500 text-sm dark:text-white">
              {calculateTime(post.createdAt)}
            </div>
          </div>
        </div>
        <div className="mb-2 dark:text-white text-black">
          <p>{post.content}</p>
        </div>
        <div
          className="flex overflow-x-auto space-x-2 no-scrollbar cursor-grab no-nav"
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {processMedia(post.media).map((media, index) => (
            <div className="" key={index}>
              {media.type === "image" ? (
                <img
                  key={index}
                  src={media.url}
                  alt={`Image ${index + 1}`}
                  className={`${
                    post.media.length > 1 ? "w-64" : "w-full"
                  } rounded `}
                  onClick={() => handleImageClick(post.media)}
                />
              ) : (
                <video
                  key={index}
                  src={media.url}
                  className={`${
                    post.media.length > 1 ? "w-48" : "w-full"
                  } rounded `}
                  onClick={() => handleImageClick(post.media)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-3 p-2 text-gray-500 dark:text-gray-200 text-sm">
          <div className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl dark:hover:bg-zinc-700 dark:hover:text-white">
            <HeartIcon
              onClick={handleLike}
              aria-hidden="true"
              className="h-6 w-6 mr-1 cursor-pointer no-nav"
              {...(isLiked ? { fill: "red", color: "red" } : { fill: "none" })}
            />
            {likeCount}
          </div>

          <div
            className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl dark:hover:bg-zinc-700 dark:hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Comment />
          </div>
          <div className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl dark:hover:bg-zinc-700 dark:hover:text-white">
            <PaperAirplaneIcon
              aria-hidden="true"
              className="h-6 w-6 mr-1 cursor-pointer no-nav"
              onClick={handleSharePost}
            />
          </div>
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <ImagePreview
          handleOverlayClick={handleOverlayClick}
          closeModal={closeModal}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};

import ImagePreview from "@/components/common/ImagePreview";
import { likeOrUnlikePost } from "@/services/postService";
import { MediaItem, PostProp } from "@/types";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { FC, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const fakeAvt = `https://github.com/shadcn.png`;

export const Post: FC<PostProp> = ({ post, innerRef, onRefresh, ...props }) => {
  const likeRef = useRef(post.likeCount);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [index, setIndex] = useState(0);
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
    setIsDragging(false);
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

      setIsDragging(true);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.dataset.isDragging = "false";
    }
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleImageClick = (images: string[], index: number) => {
    if (isDragging) return; // Prevent image click action if dragging occurred
    setIndex(index);
    setSelectedImage(images);
    setIsModalOpen(true);
  };

  const throttle = useRef(false);

  const handleLike = async () => {
    if (throttle.current) return;

    throttle.current = true;
    setTimeout(() => {
      throttle.current = false;
    }, 700);

    setIsLiked((prev) => !prev);

    try {
      const res = await likeOrUnlikePost(post.postId, post.userId, !isLiked);

      console.log(res);
      if (isLiked) {
        likeRef.current -= 1;
        setLikeCount(likeRef.current);
      } else {
        likeRef.current += 1;
        setLikeCount(likeRef.current);
      }
      onRefresh?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update like status.");
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
      nav(`/post?postId=${post.postId}&userId=${post.userId}`);
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
      className="mt-3 rounded-3xl w-full"
      key={post.postId}
      ref={innerRef}
      {...props}
    >
      <div
        className="bg-white dark:bg-zinc-800 p-4 shadow  border cursor-pointer rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
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
          className={`flex space-x-2 ${
            post.media.length > 2 ? "overflow-x-auto" : "overflow-x-hidden"
          } no-scrollbar cursor-grab no-nav`}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {processMedia(post.media).map((media, index) => (
            <div
              className={`${
                post.media.length > 2
                  ? "flex-shrink-0 h-48 lg:h-96"
                  : "h-96 w-full "
              }`}
              key={index}
            >
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                  onClick={() => handleImageClick(post.media, index)}
                  loading="lazy"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-full object-cover rounded"
                  controls
                  onClick={() => handleImageClick(post.media, index)}
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
              nav(`/post?postId=${post.postId}&userId=${post.userId}`);
            }}
          >
            <div className="flex items-center">
              <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-1 cursor-pointer" />
              {post.commentCount}
            </div>
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
          initialIndex={index}
        />
      )}
    </div>
  );
};

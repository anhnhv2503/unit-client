import ImagePreview from "@/components/common/ImagePreview";
import { PostProp } from "@/types";
import { HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FC, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const fakeImages = [
  "https://images.pexels.com/photos/19827916/pexels-photo-19827916/free-photo-of-beach.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/13082851/pexels-photo-13082851.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/15894618/pexels-photo-15894618/free-photo-of-green-rocky-mountain-and-dry-yellow-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/27054240/pexels-photo-27054240/free-photo-of-balconies-over-street-pavement-with-large-lush-flower-plants.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/26550066/pexels-photo-26550066/free-photo-of-da-nang-city-name-on-beach.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/18591653/pexels-photo-18591653/free-photo-of-waves-splashing-on-seashore-on-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const Post: FC<PostProp> = ({ post, innerRef, ...props }) => {
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const nav = useNavigate();

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
      nav(`/post/${post.id}`);
    }
  };

  return (
    <div
      className="max-w-2xl mt-3 bg-black"
      key={post.id}
      ref={innerRef}
      {...props}
    >
      <div
        className="bg-white p-4 shadow  border  cursor-pointer rounded-md"
        onClick={handleMainClick}
      >
        <div className="flex items-center mb-2 ">
          <img
            src={fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2 no-nav"
          />
          <div
            className="no-nav"
            onClick={() => {
              nav(`/user-profile/${post.userId}`);
            }}
          >
            <div className="font-semibold">User {post.id}</div>
            <div className="text-gray-500 text-sm">1d</div>
          </div>
        </div>
        <div className="mb-2">
          <p>{post.title}</p>
        </div>
        <div
          className="flex overflow-x-auto space-x-2 no-scrollbar cursor-grab no-nav"
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {fakeImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={`${
                fakeImages.length > 1 ? "w-48" : "w-full"
              } rounded `}
              onClick={() => handleImageClick(fakeImages)}
            />
          ))}
        </div>
        <div className="flex items-center mt-3 p-2 text-gray-500 text-sm">
          <div className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl ">
            <HeartIcon
              onClick={handleLike}
              aria-hidden="true"
              className="h-6 w-6 mr-1 cursor-pointer no-nav"
              {...(isLiked ? { fill: "red", color: "red" } : { fill: "none" })}
            />
            {likeCount}
          </div>

          <div
            className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Comment />
          </div>
          <div className="flex items-center p-1 mr-3 no-nav transition rounded-xl hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none hover:bg-slate-100 hover:rounded-xl">
            <PaperAirplaneIcon
              aria-hidden="true"
              className="h-6 w-6 mr-1 cursor-pointer no-nav"
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

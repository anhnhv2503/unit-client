import { HeartIcon } from "@heroicons/react/24/outline";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Comment from "../common/Comment";
import ImagePreview from "../common/ImagePreview";
import { Reply } from "../common/Reply";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReplyProps } from "@/types";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const fakeImages = [
  "https://images.pexels.com/photos/19827916/pexels-photo-19827916/free-photo-of-beach.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/13082851/pexels-photo-13082851.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/15894618/pexels-photo-15894618/free-photo-of-green-rocky-mountain-and-dry-yellow-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/27054240/pexels-photo-27054240/free-photo-of-balconies-over-street-pavement-with-large-lush-flower-plants.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/26550066/pexels-photo-26550066/free-photo-of-da-nang-city-name-on-beach.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/18591653/pexels-photo-18591653/free-photo-of-waves-splashing-on-seashore-on-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const PostDetail = () => {
  const { id } = useParams();
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
  }, []);

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
          <div className="bg-white p-4 rounded-t-lg border border-slate-400">
            <div className="flex items-center mb-2">
              <img
                src={fakeAvt}
                alt="Profile picture of the second user"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="font-semibold">User </div>
                <div className="text-gray-500 text-sm">1d</div>
              </div>
            </div>
            <div className="mb-2">
              <p>
                sunt aut facere repellat provident occaecati excepturi optio
                reprehenderit
              </p>
            </div>
            <div
              className="flex overflow-x-auto space-x-2 no-scrollbar cursor-grab"
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
                  } rounded`}
                  onClick={() => handleImageClick(fakeImages)}
                />
              ))}
            </div>
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <div className="flex items-center mr-4">
                <HeartIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  aria-hidden="true"
                  className="h-6 w-6 mr-1 cursor-pointer"
                  {...(isLiked
                    ? { fill: "red", color: "red" }
                    : { fill: "none" })}
                />
                {likeCount}
              </div>
              <Comment />
              <div className="flex items-center">
                <i className="fas fa-share mr-1"></i>
              </div>
            </div>
          </div>

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

          {isModalOpen && selectedImage && (
            <ImagePreview
              handleOverlayClick={handleOverlayClick}
              closeModal={closeModal}
              selectedImage={selectedImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

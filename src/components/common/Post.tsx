import { PostProp } from "@/types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { FC, useRef, useState } from "react";
import Comment from "./Comment";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const fakeImage =
  "https://images.pexels.com/photos/20003933/pexels-photo-20003933/free-photo-of-a-building-in-a-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";

export const Post: FC<PostProp> = ({ post, innerRef, ...props }) => {
  const likeRef = useRef(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      likeRef.current -= 1;
      setLikeCount(likeRef.current);
      console.log("clm >>>> ", isLiked);
    } else {
      likeRef.current += 1;
      setLikeCount(likeRef.current);
      console.log("clmm >>>> ", isLiked);
    }
  };

  return (
    <div className="max-w-2xl mt-4" key={post.id} ref={innerRef} {...props}>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <img
            src={fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-semibold">User {post.id}</div>
            <div className="text-gray-500 text-sm">1d</div>
          </div>
        </div>
        <div className="mb-2">
          <p>{post.title}</p>
        </div>
        <img
          src={fakeImage}
          alt="Image of a baseball player celebrating"
          className="w-full rounded"
        />
        <div className="flex items-center mt-2 text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <HeartIcon
              onClick={handleLike} // Add this line
              aria-hidden="true"
              className="h-6 w-6 mr-1 cursor-pointer"
              {...(isLiked ? { fill: "red", color: "red" } : { fill: "none" })} // Add this line
            />
            {likeCount}
          </div>
          <Comment />
          <div className="flex items-center">
            <i className="fas fa-share mr-1"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

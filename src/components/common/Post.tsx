import { HeartIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import Comment from "./Comment";

export const Post = () => {
  const likeRef = useRef(0);
  const [commentCount, setCommentCount] = useState(0);
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
    <div className="max-w-2xl mt-4">
      {/* Post 1 */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/40x40"
            alt="Profile picture of the first user"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-semibold">haasf1team</div>
            <div className="text-gray-500 text-sm">1d</div>
          </div>
        </div>
        <div className="mb-2">
          <p>Fiesta on film 📸 🇲🇽</p>
          <a href="#" className="text-blue-500">
            F1Threads
          </a>
        </div>
        <div className="flex space-x-2">
          <img
            src="https://placehold.co/100x150"
            alt="Image 1 from the first post"
            className="w-1/5 rounded"
          />
          <img
            src="https://placehold.co/100x150"
            alt="Image 2 from the first post"
            className="w-1/5 rounded"
          />
          <img
            src="https://placehold.co/100x150"
            alt="Image 3 from the first post"
            className="w-1/5 rounded"
          />
          <img
            src="https://placehold.co/100x150"
            alt="Image 4 from the first post"
            className="w-1/5 rounded"
          />
          <img
            src="https://placehold.co/100x150"
            alt="Image 5 from the first post"
            className="w-1/5 rounded"
          />
        </div>
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

      {/* Post 2 */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/40x40"
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-semibold">ktla5news</div>
            <div className="text-gray-500 text-sm">1d</div>
          </div>
        </div>
        <div className="mb-2">
          <p>
            Let's Go, <span className="text-blue-500">@Dodgers!</span>
          </p>
        </div>
        <img
          src="https://placehold.co/500x500"
          alt="Image of a baseball player celebrating"
          className="w-full rounded"
        />
        <div className="flex items-center mt-2 text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <i className="fas fa-heart mr-1"></i> 438
          </div>
          <div className="flex items-center mr-4">
            <i className="fas fa-comment mr-1"></i> 17
          </div>
          <div className="flex items-center">
            <i className="fas fa-share mr-1"></i> 6
          </div>
        </div>
      </div>

      {/* Post 3 */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <img
            src="https://placehold.co/40x40"
            alt="Profile picture of the third user"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-semibold">ggongjung</div>
            <div className="text-gray-500 text-sm">1d</div>
          </div>
        </div>
        <div className="mb-2">
          <p>Go Youngjung for Discovery Expedition 2024 FW Collection</p>
        </div>
        <div className="flex space-x-2">
          <img
            src="https://placehold.co/150x150"
            alt="Image 1 from the third post"
            className="w-1/3 rounded"
          />
          <img
            src="https://placehold.co/150x150"
            alt="Image 2 from the third post"
            className="w-1/3 rounded"
          />
          <img
            src="https://placehold.co/150x150"
            alt="Image 3 from the third post"
            className="w-1/3 rounded"
          />
        </div>
        <div className="flex items-center mt-2 text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <i className="fas fa-heart mr-1"></i> 291
          </div>
          <div className="flex items-center mr-4">
            <i className="fas fa-comment mr-1"></i> 3
          </div>
          <div className="flex items-center">
            <i className="fas fa-share mr-1"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

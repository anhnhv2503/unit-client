import { PostProps } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { Post } from "../common/Post";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

type UserProfileProps = {
  id: number;
  name: string;
  username: string;
};

export const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfileProps>({
    id: 0,
    name: "",
    username: "",
  });
  const [isFollow, setIsFollow] = useState(false);
  const { ref } = useInView();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
      .then((res) => {
        setUser(res.data[0]);
        setIsLoading(false);
      });
  }, []);

  const handleFollowUser = () => {
    setIsFollow(!isFollow);
  };

  const content = data?.map((posts: PostProps) => (
    <Post key={posts.id} post={posts} innerRef={ref} />
  ));

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-black bg-white h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <div className="max-w-2xl mt-4">
          <div className="bg-white p-4 rounded-lg border dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-black dark:text-white text-2xl">
                  {user.name}
                </div>
                <div className="text-gray-300 text-sm">{user.username}</div>
              </div>
              <img
                src={fakeAvt}
                alt="Profile picture of the first user"
                className="w-20 h-20 rounded-full mr-4"
              />
            </div>
            {isFollow ? (
              <>
                {" "}
                <div
                  className="mt-20 p-2 text-center rounded-lg border  cursor-pointer dark:text-white dark:border-white"
                  onClick={handleFollowUser}
                >
                  Following
                </div>
              </>
            ) : (
              <>
                {" "}
                <div
                  className="mt-20 p-2 text-center bg-black text-white rounded-lg cursor-pointer dark:bg-white dark:text-black"
                  onClick={handleFollowUser}
                >
                  Follow
                </div>
              </>
            )}
          </div>
        </div>
        <div className="max-w-2xl">
          {isLoading ? (
            <>
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
            <>{content}</>
          )}
        </div>
      </div>
    </div>
  );
};

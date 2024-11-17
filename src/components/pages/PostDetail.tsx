import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";

export const PostDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white dark:bg-black h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <div className="max-w-2xl mt-4">
          <div className="top-4 left-4">
            <Button
              onClick={() => nav(-1)}
              className="bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="">
            <h1 className="text-5xl">Đây là Post {id}.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

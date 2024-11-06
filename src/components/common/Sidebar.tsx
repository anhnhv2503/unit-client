import CreatePostModal from "@/components/common/CreatePostModal";
import ModePopover from "@/components/common/ModePopover";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();
  return (
    <div className="dark:bg-black bg-white dark:text-white text-black sm:w-16 w-full sm:h-screen h-16 fixed sm:left-0 bottom-0 flex sm:flex-col flex-row sm:justify-between items-center">
      <ul className="flex sm:flex-col flex-row sm:space-y-6 space-y-0 sm:space-x-0 space-x-6 sm:items-center items-center justify-center w-full sm:mt-auto sm:mb-auto">
        <li className="p-2 sm:p-4 hover:bg-gray-300 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <a
            onClick={() => nav("/")}
            className="flex items-center justify-center cursor-pointer"
          >
            <HomeIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-300 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <a
            onClick={() => nav("/search")}
            className="flex items-center justify-center cursor-pointer"
          >
            <MagnifyingGlassIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <CreatePostModal
            title={
              <>
                <PlusIcon className="w-7 h-7" />
              </>
            }
            isPrimary={false}
          />
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-300 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <a
            onClick={() => nav("/notify")}
            className="flex items-center justify-center cursor-pointer"
          >
            <BellIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-300 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <a
            onClick={() => nav("/chat")}
            className="flex items-center justify-center cursor-pointer"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
          </a>
        </li>
      </ul>

      <ul className="hidden sm:flex sm:flex-col sm:space-y-4 sm:items-center sm:mb-4 ">
        <li className="p-2 sm:p-4 hover:bg-gray-300 hover:text-zinc-800 rounded-lg transition hover:ease-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <ModePopover />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

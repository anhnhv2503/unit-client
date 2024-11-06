import {
  Bars3BottomLeftIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Sidebar = () => {
  return (
    <div className="bg-black text-white transition-all duration-200 sm:w-16 w-full sm:h-screen h-16 fixed sm:left-0 bottom-0 flex sm:flex-col flex-row sm:justify-between items-center shadow-lg">
      <ul className="flex sm:flex-col flex-row sm:space-y-6 space-y-0 sm:space-x-0 space-x-6 sm:items-center items-center justify-center w-full sm:mt-auto sm:mb-auto">
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <a href="" className="flex items-center justify-center">
            <HomeIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <a href="" className="flex items-center justify-center">
            <MagnifyingGlassIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <a href="" className="flex items-center justify-center">
            <PlusIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <a href="" className="flex items-center justify-center">
            <BellIcon className="w-7 h-7" />
          </a>
        </li>
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <a href="" className="flex items-center justify-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
          </a>
        </li>
      </ul>

      <ul className="hidden sm:flex sm:flex-col sm:space-y-4 sm:items-center sm:mb-4">
        <li className="p-2 sm:p-4 hover:bg-gray-800 rounded-lg">
          <Popover>
            <PopoverTrigger className="flex items-center justify-center">
              <Bars3BottomLeftIcon className="w-7 h-7" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4"></div>
                  <div className="grid grid-cols-3 items-center gap-4"></div>
                  <div className="grid grid-cols-3 items-center gap-4"></div>
                  <div className="grid grid-cols-3 items-center gap-4"></div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

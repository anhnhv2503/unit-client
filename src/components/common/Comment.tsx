import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Textarea } from "../ui/textarea";

const Comment = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center mr-4">
          <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-1 cursor-pointer" /> 1
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className=" items-center">
            <Textarea
              placeholder="Type your message here."
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Comment;

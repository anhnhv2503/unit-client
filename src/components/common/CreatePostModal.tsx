import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const CreatePostModal = ({
  title,
  isPrimary,
}: {
  title: string;
  isPrimary: boolean;
}) => {
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handlleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imageUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          {...(isPrimary
            ? { className: `bg-black` }
            : {
                variant: "outline",
                className:
                  "bg-white shadow-none border-none cursor-text hover:bg-white text-gray-500",
              })}
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">New Post</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex items-center mb-2 ">
            <img
              src={fakeAvt}
              alt="Profile picture of the second user"
              className="w-10 h-10 rounded-full mr-2 no-nav"
            />
            <div>
              <div className="font-semibold">User </div>
            </div>
          </div>
          <div className=" items-center">
            <Textarea
              placeholder="Type your message here."
              className="w-full border border-none outline outline-none"
            />
          </div>
          <div className="flex mt-3">
            <label htmlFor="images" className="cursor-pointer">
              <PhotoIcon
                aria-hidden="true"
                className="h-9 w-9 mr-1 cursor-pointer no-nav hover:bg-gray-100 p-1 rounded-md"
              />
            </label>
            <input
              id="images"
              name="images"
              type="file"
              className="hidden"
              onChange={handlleImageChange}
              multiple
              accept="image/*"
            />
            <div className="mt-4 flex space-x-4 overflow-x-auto p-2">
              {previewImages?.map((url, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 relative h-40 sm:h-48 md:h-56"
                >
                  <button className="absolute top-2 right-2 text-white text-2xl font-bold">
                    &times;
                  </button>
                  <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                    <img
                      src={url}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;

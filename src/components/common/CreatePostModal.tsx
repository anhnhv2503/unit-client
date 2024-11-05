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
import { ImageIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const CreatePostModal = ({
  title,
  isPrimary,
}: {
  title: string;
  isPrimary: boolean;
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    const selectedFilesArray = Array.from(selectedFile!);

    const fileArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(fileArray);
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
          <div className="">
            {selectedImages &&
              selectedImages.map((image) => (
                <div key={image}>
                  <img src={image} />
                </div>
              ))}
          </div>
          <div className="flex mt-3">
            <label className="cursor-pointer">
              <ImageIcon />
              <input
                name="images"
                type="file"
                className="hidden"
                onChange={onSelectFile}
                multiple
                accept="image/*"
              ></input>
            </label>
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

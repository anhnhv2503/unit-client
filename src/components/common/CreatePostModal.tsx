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
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState, MouseEvent } from "react";
import { toast } from "sonner";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

const CreatePostModal = ({
  title,
  isPrimary,
}: {
  title: string;
  isPrimary: boolean;
}) => {
  const [previewMedia, setPreviewMedia] = useState<
    { url: string; type: string }[]
  >([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const MAX_MEDIA_COUNT = 4;

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

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (previewMedia.length > MAX_MEDIA_COUNT) {
      toast.info(`You can only upload ${MAX_MEDIA_COUNT} files at a time.`);
      return;
    }
    const mediaData = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setPreviewMedia((prev) => [...prev, ...mediaData]);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          const imageUrl = {
            url: URL.createObjectURL(file),
            type: file.type,
          };
          setPreviewMedia((prev) => [...prev, imageUrl]);
        }
      }
    }
  };

  const removeMedia = (index: number) => {
    setPreviewMedia((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          {...(isPrimary
            ? { className: `bg-black dark:bg-white` }
            : {
                variant: "outline",
                className:
                  "bg-white shadow-none border-none cursor-text hover:bg-white text-gray-500 dark:text-gray-400",
              })}
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] dark:bg-white">
        <DialogHeader>
          <DialogTitle className="text-center dark:text-black">
            New Post
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex items-center mb-2 ">
            <img
              src={fakeAvt}
              alt="Profile picture of the second user"
              className="w-10 h-10 rounded-full mr-2 no-nav"
            />
            <div>
              <div className="font-semibold dark:text-black">User </div>
            </div>
          </div>
          <div className=" items-center">
            <Textarea
              placeholder="Type your message here."
              className="w-full border border-none outline outline-none"
              contentEditable
              onPaste={handlePaste}
            />
          </div>
          <div className="flex mt-3">
            <label htmlFor="images" className="cursor-pointer dark:text-black">
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
              onChange={handleMediaChange}
              multiple
              accept="*"
            />
            <div
              className="mt-4 flex space-x-4 overflow-x-auto p-2 no-scrollbar cursor-grab no-nav"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {previewMedia?.map((media, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 relative h-40 sm:h-48 md:h-56"
                >
                  <div
                    className="absolute top-2 right-2 text-white text-2xl h-5 w-5 font-bold rounded-full bg-black bg-opacity-50 cursor-pointer z-50"
                    onClick={() => removeMedia(index)}
                  >
                    <XMarkIcon />
                  </div>
                  <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                    {media.type.startsWith("video") ? (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
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

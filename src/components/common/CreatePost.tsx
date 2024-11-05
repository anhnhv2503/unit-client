import CreatePostModal from "@/components/common/CreatePostModal";

const fakeAvt = `https://images.pexels.com/photos/19640832/pexels-photo-19640832/free-photo-of-untitled.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`;

export const CreatePost = () => {
  return (
    <div className="bg-white p-4 shadow border border-b-slate-400 rounded-md mt-4">
      <div className="flex justify-between items-top mb-2">
        <div className="flex-none w-10 h-10 mr-4">
          <img
            src={fakeAvt}
            alt="Profile picture of the second user"
            className="w-10 h-10 rounded-full mr-4"
          />
        </div>
        <div className="flex justify-center items-center">
          <CreatePostModal title="What's New?" isPrimary={false} />
        </div>
        <div className="mt-2">
          <CreatePostModal title="Post" isPrimary={true} />
        </div>
      </div>
    </div>
  );
};

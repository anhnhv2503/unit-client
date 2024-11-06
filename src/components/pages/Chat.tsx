import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const Chat = () => {
  return (
    <div className="flex flex-col items-center px-6 py-12 lg:px-8 min-h-screen dark:bg-black bg-white overflow-y-scroll no-scrollbar">
      <div className="w-full flex justify-center mt-10">
        <div className="flex max-w-lg w-full items-center space-x-2">
          <h1>
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
            Messages
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
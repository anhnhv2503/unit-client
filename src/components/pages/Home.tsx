import { useDocumentTitle } from "@uidotdev/usehooks";
import { Post } from "../common/Post";

const Home = () => {
  useDocumentTitle("Unit");

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-zinc-950 h-full overflow-y-scroll no-scrollbar">
      <div className="h-full">
        <Post />
      </div>
    </div>
  );
};

export default Home;

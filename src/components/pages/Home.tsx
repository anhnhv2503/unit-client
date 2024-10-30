import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDocumentTitle } from "@uidotdev/usehooks";

const Home = () => {
  useDocumentTitle("Unit");
  const handleClick = () => {
    toast.info("Start develop UNIT Social Network project");
  };
  return (
    <div className="bg-zinc-950 h-screen">
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <div className="h-screen bg-zinc-950">{/* LEFT Sidebar */}</div>
        </div>
        <div className="col-span-3 row-span-5">
          <h1 className="p-6 text-3xl text-white">
            Hello world This UNIT Social Network!
          </h1>
          <Button onClick={handleClick} variant={"secondary"}>
            Start
          </Button>
        </div>
        <div className="row-span-5 col-start-5">
          <div className="h-screen bg-zinc-950">{/* RIGHT Sidebar */}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

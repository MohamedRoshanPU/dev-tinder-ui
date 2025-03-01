import { Card, CardHeader } from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex items-center gap-5">
        <div className="p-2 w-10 h-10 bg-red-500 rounded-full">
          <CircleX className="text-white" />
        </div>
        <div className="w-[300px]">
          <FeedCard />
        </div>
        <div className="p-2 w-10 h-10 bg-green-500 rounded-full">
          <CircleCheck className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Feed;

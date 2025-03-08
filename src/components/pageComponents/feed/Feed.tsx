"use client";
import { CircleCheck, CircleX } from "lucide-react";
import React, { useMemo, useState } from "react";
import FeedCard from "./FeedCard";
import { useFeed, useUserConnection } from "@/queries/connectionQueries";
import toast from "react-hot-toast";

const Feed = () => {
  const { data: feedData, refetch } = useFeed();
  const { mutate: sendConnection } = useUserConnection();

  const userCardData = useMemo(() => {
    return feedData?.data[0];
  }, [feedData?.data]);

  const handleConnectionRequest = (status: "INTERESTED" | "NOT_INTERESTED") => {
    if (userCardData) {
      sendConnection(
        { id: userCardData?._id!, status },
        {
          onSuccess(data) {
            toast.success(data.message);
            refetch();
          },
        }
      );
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex items-center gap-5">
        <div className="p-2 w-10 h-10 bg-red-500 rounded-full">
          <CircleX
            className="text-white"
            onClick={() => handleConnectionRequest("NOT_INTERESTED")}
          />
        </div>
        <div className="w-[300px]">
          <FeedCard data={userCardData} showData={userCardData !== undefined} />
        </div>
        <div className="p-2 w-10 h-10 bg-green-500 rounded-full">
          <CircleCheck
            className="text-white"
            onClick={() => handleConnectionRequest("INTERESTED")}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;

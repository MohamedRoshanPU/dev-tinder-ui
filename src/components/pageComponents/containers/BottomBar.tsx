"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, Home, MessageCircle, User } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-fit h-fit rounded-full p-4 bg-violet-50 fixed left-12 top-[50%] bottom-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg flex flex-col gap-5">
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex-grow p-2 rounded-full ${
              pathname === "/feed" ? "bg-blue-300" : ""
            }`}
            onClick={() => router.push("/feed")}
          >
            <Home
              className={`${
                pathname === "/feed" ? "text-white" : "text-blue-400"
              }`}
            />
          </div>
          <TooltipContent side="right">Feed</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex-grow p-2 rounded-full ${
              pathname === "/requests" ? "bg-green-300" : ""
            }`}
            onClick={() => router.push("/requests")}
          >
            <Heart
              className={`${
                pathname === "/requests" ? "text-white" : "text-green-400"
              }`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">Requests</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex-grow p-2 rounded-full ${
              pathname === "/connections" ? "bg-red-300" : ""
            }`}
            onClick={() => router.push("/connections")}
          >
            <MessageCircle
              className={`${
                pathname === "/connections" ? "text-white" : "text-red-400"
              }`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">Connections</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex-grow p-2 rounded-full ${
              pathname === "/profile" ? "bg-yellow-300" : ""
            }`}
            onClick={() => router.push("/profile")}
          >
            <User
              className={`${
                pathname === "/profile" ? "text-white" : "text-yellow-400"
              }`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">Profile</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BottomBar;

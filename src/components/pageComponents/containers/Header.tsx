"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { useLogout } from "@/queries/authQueries";
import { clearUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

import React from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: signout } = useLogout();

  const handleLogout = () => {
    signout(undefined, {
      onSuccess: () => {
        toast.success("Successfully Loggedout");
        dispatch(clearUser());
        router.replace("/login");
      },
    });
  };
  return (
    <div className="w-full px-4 xl:px-0 max-w-[1350px] mx-auto h-[8vh] flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public/50" />
            <AvatarFallback>RN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Light Mode</DropdownMenuItem>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;

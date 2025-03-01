import Profile from "@/components/pageComponents/profile/Profile";
import { getQueryClient } from "@/get-query-client";
import { getUserData } from "@/queries/userProfileQueries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserData(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  );
};

export default page;

import Feed from "@/components/pageComponents/feed/Feed";
import { getQueryClient } from "@/get-query-client";
import { getFeedData } from "@/queries/connectionQueries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["feed"],
    queryFn: getFeedData,
    staleTime: 0,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Feed />
    </HydrationBoundary>
  );
};

export default page;

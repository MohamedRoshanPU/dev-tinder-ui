import Requests from "@/components/pageComponents/requests/Requests";
import { getQueryClient } from "@/get-query-client";
import { getConnectionsRequests } from "@/queries/connectionQueries";
import React from "react";

const page = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["get-connection-requests"],
    queryFn: getConnectionsRequests,
    staleTime: 0,
  });
  return (
    <>
      <Requests />
    </>
  );
};

export default page;

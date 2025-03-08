"use client";
import { useGetConnectionRequests } from "@/queries/connectionQueries";
import React from "react";
import RequestCard from "./RequestCard";

const Requests = () => {
  const { data: requests, refetch: refetchRequests } =
    useGetConnectionRequests();

  return (
    <div className="w-full h-full bg-red-100 p-10 flex justify-center items-start overflow-y-auto">
      <div className="flex flex-col gap-3">
        {requests?.data.length ? (
          requests.data.map((request) => {
            return (
              <RequestCard key={`request-card-${request._id}`} data={request} />
            );
          })
        ) : (
          <div> No Connection Requests</div>
        )}
      </div>
    </div>
  );
};

export default Requests;

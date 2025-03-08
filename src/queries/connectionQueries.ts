import {
  ConnectionRequestDataType,
  RequestResponseDataType,
  UserFeedResponse,
} from "@/types/dataTypes";
import { customGetRequest, customPostRequest } from "@/utils/networkActions";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getFeedData = async () => {
  return customGetRequest<UserFeedResponse>("/api/feed");
};

export const getConnectionsRequests = async () => {
  return customGetRequest<RequestResponseDataType>(
    "/api/connection/get-requests/INTERESTED"
  );
};

export const getConnections = async () => {
  return customGetRequest<RequestResponseDataType>(
    "/api/connection/get-requests/ACCEPTED"
  );
};

export const useFeed = () => {
  return useQuery<UserFeedResponse, Error>({
    queryKey: ["feed"],
    queryFn: getFeedData,
    staleTime: 0,
  });
};

export const useGetConnectionRequests = () => {
  return useQuery<RequestResponseDataType, Error>({
    queryKey: ["get-connection-requests"],
    queryFn: getConnectionsRequests,
    staleTime: 0,
  });
};

export const useGetConnections = () => {
  return useQuery<RequestResponseDataType, Error>({
    queryKey: ["get-connections"],
    queryFn: getConnections,
    staleTime: 0,
  });
};

export const useUserConnection = () => {
  return useMutation<{ message: string }, Error, ConnectionRequestDataType>({
    mutationFn: async (data: ConnectionRequestDataType) => {
      return customPostRequest("/api/connection/send-request", data);
    },
  });
};

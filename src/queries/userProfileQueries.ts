import { UserResponseData } from "@/types/dataTypes";
import { customGetRequest } from "@/utils/networkActions";
import { useQuery } from "@tanstack/react-query";

export const getUserData = async () => {
  return customGetRequest<UserResponseData>(`/api/user/profile`);
};

export const useGetUserData = () => {
  return useQuery<UserResponseData, Error>({
    queryKey: ["user-profile"],
    queryFn: getUserData,
    staleTime: 0,
  });
};

import { UserResponseData } from "@/types/dataTypes";
import { customGetRequest, customPatchRequest } from "@/utils/networkActions";
import { formSchema } from "@/utils/schema/userProfileSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

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

export const useUpdateUser = () => {
  return useMutation<UserResponseData, Error, z.infer<typeof formSchema>>({
    mutationFn: async (data) => {
      return customPatchRequest(`/api/user/profile/update`, data);
    },
  });
};

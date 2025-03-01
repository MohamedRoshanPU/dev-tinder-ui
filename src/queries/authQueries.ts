import { LoginDataType, LoginResponseData } from "@/types/dataTypes";
import { customPostRequest } from "@/utils/networkActions";
import { formSchema } from "@/utils/schema/loginUserSchema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<LoginResponseData | undefined, Error, LoginDataType>({
    mutationFn: async (data) => {
      return customPostRequest("/api/auth/login", data);
    },
  });
};

export const signUp = () => {};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return customPostRequest("/api/auth/logout", {});
    },
  });
};

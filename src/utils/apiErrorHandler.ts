import { AxiosError } from "axios";
import cookies from "js-cookie";
import { toast } from "react-hot-toast";

interface AxiosErrorResponse {
  error?: string;
}

export const handleApiError = (error: unknown) => {
  const AxiosError = error as AxiosError<AxiosErrorResponse>;
  const errorMessage = `${
    AxiosError.response?.data?.error || "Something went wrong"
  }`;

  toast.error(errorMessage);

  if (AxiosError.status === 401) {
    cookies.remove("token");
    throw new Error(AxiosError.message || "Unauthorized user");
  }
  if (AxiosError.status === 400) {
    throw new Error(AxiosError.message || "Bad request");
  }
  if (AxiosError.status === 500) {
    throw new Error(AxiosError.message || "Something went wrong!");
  }
};

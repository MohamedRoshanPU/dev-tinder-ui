import { AxiosError } from "axios";
import cookies from "js-cookie";
import { toast } from "react-hot-toast";

interface AxiosErrorResponse {
  error?: string;
  message?: string;
}

export const handleApiError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    toast.error("An unexpected error occurred.");
    throw new Error("Unknown error occurred");
  }

  const { response, message } = error;
  const status = response?.status;
  const errorMessage = response?.data?.error || response?.data?.message;

  // Status-based error handling
  const statusMessages: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized! Please log in again.",
    403: "Forbidden! You don't have permission.",
    404: "Resource not found.",
    500: "Server error! Please try again later.",
  };

  toast.error(errorMessage || statusMessages[status!]);

  if (status === 401) {
    cookies.remove("token");
  }

  throw new Error(
    statusMessages[status!] || message || "An unexpected error occurred"
  );
};

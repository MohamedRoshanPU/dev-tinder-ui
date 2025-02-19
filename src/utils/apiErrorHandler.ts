import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import cookies from "js-cookie";

interface AxiosErrorResponse {
  error?: string;
}

export const handleApiError = (error: unknown) => {
  const AxiosError = error as AxiosError<AxiosErrorResponse>;
  if (AxiosError.status === 401) {
    cookies.remove("token");
  }
  toast({
    variant: "destructive",
    title: AxiosError.response?.data.error,
    description: AxiosError.message,
  });
};

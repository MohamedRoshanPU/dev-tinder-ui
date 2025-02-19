import { toast } from "@/hooks/use-toast";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

interface ErrorResponse {
  error?: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response handler
const handleResponse = <T>(response: AxiosResponse<T>): T => response.data;

// Error handler
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    toast({
      variant: "destructive",
      title: axiosError?.response?.data?.error,
      description: axiosError.message,
    });
    throw axiosError.response?.data || { message: axiosError.message };
  }
  throw new Error("Oops! Something went wrong");
};

// Custom GET request
export const getRequest = async <T>(
  url: string,
  params = {}
): Promise<T | undefined> => {
  try {
    const response = await api.get<T>(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
  return undefined;
};

// Custom POST request
export const postRequest = async <T>(
  url: string,
  data: object = {}
): Promise<T | undefined> => {
  try {
    const response = await api.post<T>(url, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
  return undefined;
};

// Custom PATCH request
export const patchRequest = async <T>(
  url: string,
  data: object = {}
): Promise<T | undefined> => {
  try {
    const response = await api.patch<T>(url, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
  return undefined;
};

// Custom DELETE request
export const deleteRequest = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await api.delete<T>(url);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
  return undefined;
};

export default api;

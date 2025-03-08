import axios, { AxiosResponse } from "axios";
import { handleApiError } from "./apiErrorHandler";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleResponse = (res: AxiosResponse) => res.data;

export const customGetRequest = async <T>(url: string): Promise<T> => {
  try {
    let res: AxiosResponse<T> = await Api.get<T>(url);
    return handleResponse(res);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const customPostRequest = async <T>(
  url: string,
  data: any
): Promise<T> => {
  try {
    let res: AxiosResponse<T> = await Api.post<T>(url, data);
    return handleResponse(res);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const customPatchRequest = async <T>(
  url: string,
  data: any
): Promise<T> => {
  try {
    let res: AxiosResponse<T> = await Api.patch(url, data);
    return handleResponse(res);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

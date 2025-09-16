import { msAxiosInstance, msPublicAxiosInstance } from "./axiosInstance";

export async function request<T>(
  url: string,
  instance: "public" | "private" = "public",
  body?: unknown,
  method: string = "GET"
): Promise<T> {
  const axiosInstance = instance === "public" ? msPublicAxiosInstance : msAxiosInstance;
  try {
    const res = await axiosInstance({
      method,
      url,
      data: body,
    });
    return res.data as T;
  } catch (error) {
    throw error; 
  }
}
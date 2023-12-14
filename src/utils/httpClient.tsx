import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface AxiosClientProps {
  requestData?: {
    [index: string]: string;
  };
  config?: AxiosRequestConfig;
}

export const axiosClient = ({
  requestData,
  config,
}: AxiosClientProps): AxiosInstance => {
  const url = new URL(`http://${process.env.baseURL}/api`);
  const urlSearchParam = new URLSearchParams(url.search);

  for (const request in requestData) {
    urlSearchParam.set(request, requestData["request"]);
  }

  const instance = axios.create({
    baseURL: url.toString(),
    withCredentials: true,
    ...config,
  });

  return instance;
};

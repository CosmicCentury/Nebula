import axios from "axios";
import { axiosClient } from "../utils/httpClient";

export const authenticate = (email: string, password: string) => {
  const url = new URL(`http://${process.env.baseURL}/api/v1/user/authenticate`);

  const postData = {
    email: email,
    password: password,
  };

  return axiosClient({}).post("/v1/user/authenticate", postData);
};

export interface UserInfoResponse {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
  roleName: string;
}

export const getUser = (userId: string) => {
  return axiosClient({ requestData: { userId } }).get("/v1/user", {
    withCredentials: true,
  });
};

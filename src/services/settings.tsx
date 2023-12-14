import axios from "axios";
import { axiosClient } from "../utils/httpClient";

export interface UserResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  data: {
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    loginAt: string;
    phoneNumber: string;
    roleId: number;
    roleName: string;
    status: string;
    userId: number;
  }[];
}

export const getAllUsers = () => {
  return axiosClient({}).get<UserResponse>("/v1/users");
};

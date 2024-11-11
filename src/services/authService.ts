import axiosInstance from "./axiosClient";

export const login = async (email: string, password: string) => {
  return axiosInstance.post("api/auth/SignIn", {
    email: email,
    password: password,
  });
};

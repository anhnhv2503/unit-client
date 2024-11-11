import axiosInstance from "./axiosClient";

export const login = async (email: string, password: string) => {
  return axiosInstance.post("auth/SignIn", {
    email: email,
    password: password,
  });
};

export const sendResetPasswordEmail = async (email: string) => {
  return axiosInstance.post("auth/send-reset-password-Code", { email: email });
};

export const resetPassword = async (
  email: string,
  code: string,
  password: string,
  ConfirmPassword: string
) => {
  return axiosInstance.post("auth/reset-password", {
    email,
    code,
    password,
    ConfirmPassword,
  });
};

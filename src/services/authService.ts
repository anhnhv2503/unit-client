import axiosInstance from "./axiosClient";

export const getHeader = () => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

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

export const logout = async () => {
  return axiosInstance.post(
    "auth/SignOut",
    {},
    {
      headers: getHeader(),
    }
  );
};

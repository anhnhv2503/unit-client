import axiosInstance from "@/services/axiosClient";

export const getPosts = async () => {
  // const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.get("/post");
};

export const createPost = async (data: any) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.post("/post", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refreshTokens = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
  return axiosInstance.post("/auth/refresh-token", {
    refreshToken: refreshToken,
  });
};

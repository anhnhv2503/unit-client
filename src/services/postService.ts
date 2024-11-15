import axiosInstance from "@/services/axiosClient";

export const getPosts = async (pageParam?: string) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.get(
    `/post?size=15&page=${pageParam || ""}&orderBy=createdAt desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const getPostByUserId = async (userId: string) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.get(`/post?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

import axiosInstance from "@/services/axiosClient";

export const getCommentsByPostId = async (postId: string) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.get(`post/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createComment = async (postId: string | undefined, data: any) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.post(`post/${postId}/comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

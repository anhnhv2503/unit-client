import axiosInstance from "@/services/axiosClient";

export const getPosts = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.get("/post", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createPost = async (data: any) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  return axiosInstance.post("/post", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

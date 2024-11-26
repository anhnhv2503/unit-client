import axiosInstance from "@/services/axiosClient";

export const getAllNotifications = async () => {
  return axiosInstance.get("/notification");
};

export const deleteNotification = async (notificationId: string) => {
  return axiosInstance.delete(`/notification/${notificationId}`);
};

export const isSeenNotification = async (createdAt: string) => {
  return axiosInstance.post(`/notification`, {
    createdAt,
  });
};

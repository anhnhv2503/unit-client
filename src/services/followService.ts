import axiosInstance from "@/services/axiosClient";

export const getFollowers = async (userId: string) => {
  return axiosInstance.get(
    `user/p/${userId}?Followers=true&include=Followers&size=10&pageNumber=1&fields=UserId,UserName,ProfilePicture`
  );
};

export const getFollowing = async (userId: string) => {
  return axiosInstance.get(
    `user/p/${userId}?Following=true&include=Following&size=10&pageNumber=1&fields=UserId,UserName,ProfilePicture`
  );
};

export const unfollowUser = async (userId: string) => {
  const formData = new FormData();
  formData.append("follow", userId);
  return axiosInstance.post("user", formData);
};

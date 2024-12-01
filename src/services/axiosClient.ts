import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-18-136-193-23.ap-southeast-1.compute.amazonaws.com/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // console.log("config", config);
    const token = JSON.parse(localStorage.getItem("accessToken")!);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken: refreshToken,
        });

        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log("err", err);

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

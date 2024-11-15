import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
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
    console.log("res", res);
    return res;
  },
  async (error) => {
    // console.log("error", error.config);
    const originalRequest = error.config;

    console.log(originalRequest);

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

        console.log("response", response);

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

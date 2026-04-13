
// export default api;
import axios from "axios";

const BASE_URL = "http://32.195.186.128:4040";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Add access token to each request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// ✅ Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Refresh token only if it's a 401 and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            // 👇 Adjust this route to match your backend refresh endpoint
            const res = await axios.post(`${BASE_URL}/auth/refresh`, {
              token: refreshToken,
            });

            const newAccessToken = res.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed ❌", refreshError);
            // Optionally, clear tokens and redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

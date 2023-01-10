import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    common: {
      "Accept-Language": "ir",
    },
  },
});

export const setupInterceptors = (store) => {
  // createAuthRefreshInterceptor(axiosInstance, (failedRequest) =>
  //   axiosInstance
  //     .post("/auth/refresh/", {
  //       user_id: store.getState().authReducer?.username,
  //       refresh: store.getState().authReducer?.refresh,
  //     })
  //     .then((resp) => {
  //       const { access: accessToken } = resp.data;
  //       const bearer = `${
  //         process.env.JWT_AUTH_HEADER ?? "Bearer"
  //       } ${accessToken}`;
  //       console.log(accessToken);
  //       axiosInstance.defaults.headers.common.Authorization = bearer;

  //       failedRequest.response.config.headers.Authorization = bearer;
  //       return Promise.resolve();
  //     })
  // );

  createAuthRefreshInterceptor(axiosInstance, async (failedRequest) => {
    try {
      const resp = await axiosInstance.post("/auth/refresh/", {
        refresh: store.getState().authReducer?.refresh,
      });
      const { access: accessToken } = resp.data;
      const bearer = `${process.env.JWT_AUTH_HEADER ?? "Bearer"} ${accessToken}`;
      console.log(accessToken);
      axiosInstance.defaults.headers.common.Authorization = bearer;
  
      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    } catch(e) {
    }
  });
};

export default axiosInstance;

import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

const token = JSON.parse(localStorage.getItem("token"));
const accessToken = token?.accessToken || null;
const auth = accessToken ? `${token.accessToken}` : null;

console.log("Auth value in fetchToken:", auth);
console.log("token", token);
console.log("accessToken", accessToken);

//Axios 인스턴스 생성
const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`, //API 기본 URL
  headers: {
    Authorization: auth,
    "Content-Type": "application/json",
  },
  withCredentials: true, //쿠기 사용을 위한 설정정
});

//요청 인터셉터
client.interceptors.request.use(
  (response) => {
    console.log("Auth value in fetchToken:", auth);
    if (token && token.accessToken) {
      response.headers.Authorization = `${token.accessToken}`;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

//응답 인터셉터
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status, data } = error.response || {};

    //토큰 만료 오류 처리
    if (
      status === 401 &&
      data.error === "Token Expired&&!originalRequest_retry"
    ) {
      originalRequest._retry = true;
      try {
        //await refreshToken();
        const token = JSON.parse(localStorage.getItem("token"));
        if (token && token.refreshToken) {
          const response = await axios.get(
            `/auth/kakao`,
            { refreshToken: token.refreshToken },
            {
              headers: {
                Authorization: auth,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          //새 토큰 저장
          const newToken = response.data;
          localStorage.setItem("token", JSON.stringify(newToken));

          //갱신된 토큰으로 요청 헤더 설정
          client.defaults.headers.Authorization = `${newToken.accessToken}`;
          originalRequest.headers.Authorization = `${newToken.accessToken}`;

          //원래 요청 재시도
          return client(originalRequest);
        } else {
          throw new Error("RefreshToken not found");
        }
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export { client };
/*
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

const token = JSON.parse(localStorage.getItem("token"));
const accessToken = token?.accessToken || null;

if (accessToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const storedToken = JSON.parse(localStorage.getItem("token"));
    if (storedToken?.accessToken) {
      config.headers.Authorization = `Bearer ${storedToken.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status } = error.response || {};

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedToken = JSON.parse(localStorage.getItem("token"));
        if (storedToken?.refreshToken) {
          const refreshResponse = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/auth/kakao/`,
            { refreshToken: storedToken.refreshToken }
          );

          const newToken = refreshResponse.data;
          localStorage.setItem("token", JSON.stringify(newToken));
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Refresh token not found");
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);*/

import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { api } from "../../api/api";

const OAuthRedirectPage = () => {
  console.log("OAuth");
  const code = new URL(window.location.href).searchParams.get("code");
  localStorage.setItem("code", code);
  const navigate = useNavigate();
  const readAccessTokenKakao = async () => {
    try {
      console.log("Received OAuth code:", code);

      const fetchToken = async () => {
        try {
          const response = await api.get(`/auth/kakao/callback?code=${code}`);
          console.log("Response from server:", response);

          const token = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            userInfo: response.data.userInfo,
          };
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("kakao_id", response.data.userInfo.id);
          console.log("ss", response.data.userInfo.id);
          console.log("Token saved:", token);
          return token;
        } catch (error) {
          localStorage.removeItem("token");
          console.error("Failed to fetch token:", error);
          throw error;
        }
      };
      console.log("Before fetchToken");
      console.log(code);
      const token = await fetchToken();
      console.log("After fetchToken");
      if (token) {
        navigate("/createprofile");
      }
    } catch (error) {
      console.error("Error in readAccessTokenKakao:", error);
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    readAccessTokenKakao();
  }, []);

  return <div>Redirecting...</div>;
};

export default OAuthRedirectPage;

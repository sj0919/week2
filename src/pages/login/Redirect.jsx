import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { api } from "../../api/api";

const OAuthRedirectPage = () => {
  console.log("Oauth");
  const code = new URL(window.location.href).searchParams.get("code");
  localStorage.setItem("code", code);
  const navigate = useNavigate();
  const readAccessTokenKakao = async () => {
    try {
      console.log("Received OAuth code:", code);

      const fetchToken = async () => {
        try {
          console.log("run");
          const response = await api.get(`/auth/kakao`);
          console.log("Response from server:", response);

          const token = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          };
          localStorage.setItem("token", JSON.stringify(token));
          console.log("Token saved:", token);
          return token;
        } catch (error) {
          localStorage.removeItem("token");
          console.error("Failed to fetch token:", error);
          throw error;
        }
      };
      const token = await fetchToken(code);
      if (token) {
        navigate("/home");
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

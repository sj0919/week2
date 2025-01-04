import { ReactComponent as Kakao } from "../../assets/login/kakao_login.svg";
import { ReactComponent as Logo } from "../../assets/login/logo.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=09a698a4561ba30fa6ac339bcd61a899&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      window.location.href = KAKAO_AUTH_URI;
    }
  };
  return (
    <Layout>
      <Logo />
      <ButtonWrapper>
        <button
          onClick={handleKakaoLogin}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <Kakao />
        </button>
      </ButtonWrapper>
    </Layout>
  );
};

export default LoginPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 90px;
`;

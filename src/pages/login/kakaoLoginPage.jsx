import { ReactComponent as Kakao } from "../../assets/login/kakao_login.svg";
import { ReactComponent as Logo } from "../../assets/login/logo.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      navigate("/createprofile");
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
  margin-top: 200px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 90px;
`;

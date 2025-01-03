import { ReactComponent as Kakao } from "../../assets/login/kakao_login.svg";
import { ReactComponent as Logo } from "../../assets/login/logo.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [data, setData] = useState("Loading...");
  useEffect(() => {
    fetch("http://172.10.7.65:4000/api/data")
      .then((response) => response.text()) // 문자열 응답 처리
      .then((result) => setData(result)) // 상태 업데이트
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData("Failed to load data");
      });
  }, []); // 빈 배열로 한 번만 실행

  return (
    <div>
      <h1>API Response:</h1>
      <p>{data}</p>
    </div>
  );

  /*return (/
    <Layout>
      <Logo />
      <ButtonWrapper>
        <Kakao />
      </ButtonWrapper>
    </Layout>
  );*/
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

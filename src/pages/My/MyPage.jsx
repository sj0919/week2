import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import { useState, useEffect } from "react";
import { getUserInfo, delUser } from "../../api/user";
import { postLogout } from "../../api/user";

const MyPage = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [kakaoId, setKakaoId] = useState("");

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, [kakaoId]);
  const readUserInfo = async () => {
    try {
      const response = await getUserInfo(kakaoId);
      const { name, nickname, introduce } = response.data.data;
      setName(name);
      setNickname(nickname);
      setIntroduce(introduce);
      console.log(name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    readUserInfo();
  }, [kakaoId]);

  const postLogout = async () => {
    try {
      const response = await postLogout(kakaoId);
      localStorage.removeItem("token");
      console.log("logout success");
      console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUser = async () => {
    try {
      const response = await delUser(kakaoId);
      localStorage.removeItem("token");
      console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <TopBar />
      <ProfileContainer>
        <ProfileImage />
        <ProfileInfo>
          <Name>
            {name}
            <Username>{nickname}</Username>
          </Name>
          <Greeting>{introduce}</Greeting>
        </ProfileInfo>
      </ProfileContainer>
      <ButtonContainer>
        <Button onClick={postLogout}>로그아웃</Button>
        <ButtonPurple onClick={deleteUser}>회원탈퇴</ButtonPurple>
      </ButtonContainer>
      <NavigationBar />
    </Layout>
  );
};

export default MyPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  gap: 16px;
  margin: 20px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--gray-200);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: var(--black);
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: var(--purple-pri);
  margin-left: 8px;
`;

const Greeting = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 400px;
  margin-left: 20px;
  gap: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonPurple = styled(Button)`
  color: var(--purple-pri);
`;

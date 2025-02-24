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
      console.log(response);
      window.location.href = "/";
    } catch (err) {
      console.log("로그아웃 실패");
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
        <ProfileImage
          src={`${process.env.REACT_APP_BASE_URL}/uploads/${kakaoId}.jpg`}
        />
        <ProfileInfo>
          <HLine />
          <strong>{name}</strong>
          <Username>
            닉네임은 <strong>{nickname}</strong>
          </Username>
          <Greeting>{introduce}</Greeting>
          <HLine />
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
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  gap: 16px;
  margin: 45px;
`;

const ProfileImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: var(--gray-200);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 17px;
`;

const HLine = styled.div`
  display: flex;
  border: 0.5px solid var(--gray-200);
  width: 150px;
  margin: 10px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: normal;
  margin-left: 8px;
`;

const Greeting = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  margin-top: 200px;
  gap: 10px;
  width: 100%; /* Ensure the container spans the full width */
  padding-left: 30px; /* Add some padding for consistent alignment */
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-align: left; /* Ensure the text is aligned to the left */
  width: 100%; /* Optional: full-width buttons for consistency */
  max-width: 200px; /* Control button width */
`;

const ButtonPurple = styled(Button)`
  color: var(--purple-pri);
  font-weight: 700;
`;

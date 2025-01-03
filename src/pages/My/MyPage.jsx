import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const MyPage = () => {
  return (
    <Layout>
      <TopBar />
      <ProfileContainer>
        <ProfileImage />
        <ProfileInfo>
          <Name>
            이승진 <Username>SJSJ</Username>
          </Name>
          <Greeting>반가워어요</Greeting>
        </ProfileInfo>
      </ProfileContainer>
      <ButtonContainer>
        <Button>로그아웃</Button>
        <ButtonPurple>회원탈퇴</ButtonPurple>
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

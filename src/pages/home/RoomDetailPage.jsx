import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import ParticipantSlider from "../../components/home/ParticipantSlider";
import { ReactComponent as Exit } from "../../assets/home/exit.svg";
import { useNavigate } from "react-router";
const RoomDetailPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <TopContainer>
          <TitleContainer>
            <RoomName>몰캠 4분반</RoomName>
            <InviteButton onClick={() => navigate("/invitemember")}>
              멤버 초대
            </InviteButton>
          </TitleContainer>
          <ExitIcon />
        </TopContainer>
        <ParticipantSliderContainer>
          <ParticipantSlider />
        </ParticipantSliderContainer>
        <ChooseContainer>
          <Message>
            식사자리, 회식자리, <br />
            뭐먹을지 못정하겠다면?
          </Message>
          <MenuButton onClick={() => navigate("/inputmenu")}>
            메뉴
            <br /> 입력하기
          </MenuButton>
        </ChooseContainer>
      </ContentContainer>
    </Layout>
  );
};

export default RoomDetailPage;

const Layout = styled.div`
  padding: 20px;
  background-color: var(--white);
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const RoomName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const InviteButton = styled.button`
  background-color: var(--purple-pri);
  color: var(--white);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
`;

const ExitIcon = styled(Exit)`
  cursor: pointer;
`;

const ParticipantSliderContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const ChooseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const Message = styled.p`
  font-size: 18px;
  color: var(--black);
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const MenuButton = styled.button`
  width: 86px;
  height: 52px;
  background-color: var(--purple-pri);
  color: var(--white);
  border: none;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

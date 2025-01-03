import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import ParticipantSlider from "../../components/home/ParticipantSlider";
const RoomDetailPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <TopContainer>
        <TextWrapper>몰캠 4분반</TextWrapper>
        <ButtonWrapper>멤버 초대</ButtonWrapper>
      </TopContainer>
      <ParticipantSlider />
      <TextWrapper>식사자리,회식자리, 뭐먹을지 못정했다면?</TextWrapper>
      <ButtonWrapper>메뉴 정하러가기</ButtonWrapper>
    </Layout>
  );
};

export default RoomDetailPage;

const Layout = styled.div``;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 30px 0px 30px 0px;
  gap: 60px;
`;
const TextWrapper = styled.span`
  size: 16px;
`;
const ButtonWrapper = styled.button`
  background-color: var(--purple-pri);
  border-radius: 8px;
  color: var(--white);
  border: none;
`;

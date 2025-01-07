import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import ParticipantSlider from "../../components/home/ParticipantSlider";
import { ReactComponent as Exit } from "../../assets/home/exit.svg";
import { useNavigate } from "react-router";
import { delRoom, getRoomDetail } from "../../api/room";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState([]); // names 데이터를 저장할 상태
  console.log("방아이디", roomId);

  // 각 방 정보 읽기 API 연결
  const readRoomDetail = async () => {
    try {
      const response = await getRoomDetail(roomId);
      const roomInfo = response.data.data.roomInfo[0];
      const names = response.data.data.names;

      if (roomInfo) {
        setRoomName(roomInfo.name); // 방 이름 설정
      }
      if (Array.isArray(names)) {
        setParticipants(names); // names 데이터를 설정
      }

      console.log("Room Info:", roomInfo);
      console.log("Participants:", names);
    } catch (err) {
      console.error(err);
    }
  };

  const [kakaoId, setKakaoId] = useState("");

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, []);

  useEffect(() => {
    if (roomId) {
      readRoomDetail();
    }
  }, [roomId]);

  // 방 나가기 API 연결
  const deleteRoom = async () => {
    try {
      console.log("roomId", roomId);
      const response = await delRoom(roomId, kakaoId);
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <TopContainer>
          <TitleContainer>
            <RoomName>{roomName}</RoomName>
            <InviteButton onClick={() => navigate("/invitemember")}>
              멤버 초대
            </InviteButton>
          </TitleContainer>
          <ExitIcon onClick={deleteRoom} />
        </TopContainer>
        <ParticipantSliderContainer>
          <ParticipantSlider names={participants} />
        </ParticipantSliderContainer>
        <ChooseContainer>
          <Message>
            식사자리, 회식자리, <br />
            뭐먹을지 못정하겠다면?
          </Message>
          <MenuButton
            onClick={() => navigate(`/inputmenu/${roomId}/${kakaoId}`)}
          >
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
  margin: 10px;
  background-color: var(--white);
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
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

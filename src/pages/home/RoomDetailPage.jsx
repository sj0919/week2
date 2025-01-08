import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import ParticipantSlider from "../../components/home/ParticipantSlider";
import { ReactComponent as Exit } from "../../assets/home/exit.svg";
import { ReactComponent as AddUser } from "../../assets/home/add_user.svg";
import { useNavigate } from "react-router";
import { delRoom, getRoomDetail } from "../../api/room";
import { patchReset } from "../../api/room";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { patchVoteResult } from "../../api/room";

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState([]); // names 데이터를 저장할 상태
  const [profile, setProfiles] = useState([]);
  const [vote, setVote] = useState(0);
  console.log("방아이디", roomId);

  // 각 방 정보 읽기 API 연결
  const readRoomDetail = async () => {
    try {
      const response = await getRoomDetail(roomId);
      const roomInfo = response.data.data.roomInfo[0];
      const names = response.data.data.names;
      const images = response.data.data.userIds;

      if (roomInfo) {
        setRoomName(roomInfo.name); // 방 이름 설정
      }
      if (Array.isArray(names)) {
        setParticipants(names); // names 데이터를 설정
      }
      if (Array.isArray(images)) {
        setProfiles(images);
      }

      console.log("Room Info:", roomInfo);
      console.log("Participants:", names);
      console.log("images", images);
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

  // 투표 결과 확인 API 연결
  const checkVoteStatus = async () => {
    try {
      const response = await patchVoteResult(roomId);
      const voteStatus = response.data.data.vote;
      setVote(voteStatus); // vote 값 업데이트
      console.log("투표 상태:", voteStatus);
    } catch (err) {
      console.error("투표 상태 확인 실패:", err);
    }
  };

  useEffect(() => {
    if (roomId) {
      readRoomDetail();
      checkVoteStatus();
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

  // 퀴즈 초기화 함수
  const resetQuiz = async () => {
    try {
      const response = await patchReset(roomId); // 퀴즈 초기화 API 호출
      console.log("퀴즈 초기화 완료:", response);
      alert("퀴즈가 초기화되었습니다!"); // 사용자 알림
    } catch (err) {
      console.error("퀴즈 초기화 실패:", err);
      alert("퀴즈 초기화에 실패했습니다.");
    }
  };

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <TopContainer>
          <TitleContainer>
            <RoomName>{roomName}</RoomName>
          </TitleContainer>
          <IconsContainer>
            <AddUser onClick={() => navigate(`/invitemember/${roomId}`)} />
            <ExitIcon onClick={deleteRoom} />
          </IconsContainer>
        </TopContainer>
        <ParticipantSliderContainer>
          <ParticipantSlider
            names={participants}
            profiles={profile}
            roomId={roomId}
          />
        </ParticipantSliderContainer>
        <ContentsContainer>
          <ChooseContainer>
            <Message>
              식사자리, 회식자리, <br />
              뭐먹을지 못정하겠다면?
            </Message>
            <MenuButton
              onClick={() => navigate(`/inputmenu/${roomId}/${kakaoId}`)}
            >
              메뉴 입력
            </MenuButton>
          </ChooseContainer>
          <ChooseContainer>
            <Message>
              팀원이 메뉴를
              <br />다 입력했다면?
            </Message>
            <MenuButton
              onClick={() => navigate(`/namequiz/${roomId}/${kakaoId}`)}
            >
              퀴즈 풀기
            </MenuButton>
          </ChooseContainer>
          <ChooseContainer>
            <Message>
              메뉴 결과를 <br />
              확인하고싶다면?
            </Message>
            <MenuButton onClick={() => navigate(`/result/${roomId}`)}>
              결과 확인
            </MenuButton>
          </ChooseContainer>
          <ChooseContainer>
            <Message>메뉴 결과 보고 투표를 하고싶다면?</Message>
            <MenuButton onClick={() => navigate(`/vote/${roomId}/${kakaoId}`)}>
              투표하기
            </MenuButton>
          </ChooseContainer>
          <ChooseContainer>
            <Message>투표 결과 확인하기</Message>
            <MenuButton
              onClick={() => navigate(`/vote/result/${roomId}/${kakaoId}`)}
              disabled={vote === 0} // vote 값이 0이면 버튼 비활성화
            >
              {vote === 1 ? <A>활성화됨</A> : <B>비활성화됨</B>}
            </MenuButton>
          </ChooseContainer>
        </ContentsContainer>
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
  margin-top: 14px;
`;
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 500px;
  background-color: var(--purple-thi);
  padding-top: 10px;
  padding-bottom: 10px;
`;
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  background-color: var(--purple-thi);
  padding: 10px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const RoomName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: var(--purple-pri);
`;

const ExitIcon = styled(Exit)`
  cursor: pointer;
`;

const ParticipantSliderContainer = styled.div`
  width: 100%;

  margin-bottom: 17px;
`;
const ChooseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px; /* 부모 컨테이너의 너비를 가득 채우도록 설정 */
  height: 70px;
  box-sizing: border-box; /* 패딩이 전체 너비에 포함되도록 설정 */
  background-color: var(--white);
  margin: 5px;
  border: 1px solid var(--purple-sec);
  padding: 18px;
  border-radius: 10px;
`;

const Message = styled.p`
  font-size: 14px;
  color: var(--black);
  text-align: left; /* 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
`;

const MenuButton = styled.button`
  width: 80px; /* 버튼 너비 조정 */
  height: 45px;
  background-color: var(--purple-sec);
  border: 0px solid var(--purple-pri);
  color: var(--black);
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ResetButton = styled.button`
  margin-top: 10px;
  width: 120px;
  height: 40px;
  color: var(--purple-pri);
  background-color: var(--purple-thi);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const A = styled.div`
  color: var(--red);
`;
const B = styled.div`
  color: var(--red);
`;

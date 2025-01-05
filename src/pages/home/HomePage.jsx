import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import NavigationBar from "../../components/common/NavigationBar";
import RoomItem from "../../components/home/RoomItem";
import { useNavigate } from "react-router";
import { getRoom } from "../../api/room";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [newMember, setNewMember] = useState("");
  const navigate = useNavigate();

  const [kakaoId, setKakaoId] = useState("");

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, []);

  //방 list 불러오는 API
  const readRoomList = async (kakaoId) => {
    try {
      const response = await getRoom(kakaoId);
      setResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewMember(e.target.value);
  };

  const handleInviteClick = () => {
    if (newMember.trimEnd() !== "") {
      const updatedResults = results.map((room, index) => {
        if (index === 0) {
          return { ...room, member: room.member + newMember + "," };
        }
        return room;
      });
    }
  };
  const onChange = (e) => {
    setResults(e.target.value);
  };
  useEffect(() => {
    readRoomList();
  }, [kakaoId]);
  return (
    <Layout>
      <TopBar />
      <TopContainer>
        <TextWrapper>새로운 방을 만들고 싶으신가요?</TextWrapper>
        <ButtonWrapper onClick={() => navigate("/createroom")}>
          방 생성
        </ButtonWrapper>
      </TopContainer>
      {results &&
        results.map((result, index) => (
          <RoomItem
            key={result.id}
            title={result.title}
            member={result.member}
            onClick={() => navigate(`/roomdetail`)}
          />
        ))}
      <NavigationBar />
    </Layout>
  );
};
export default HomePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px;
  gap: 20px;
`;
const TextWrapper = styled.span`
  size: 16px;
  font-weight: 600;
`;
const ButtonWrapper = styled.button`
  width: 62px;
  height: 28px;
  background-color: var(--purple-pri);
  border-radius: 8px;
  color: var(--white);
  border: none;
`;

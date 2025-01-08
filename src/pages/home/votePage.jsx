import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useState, useEffect } from "react";
import { getMenu, patchUserVote } from "../../api/room"; // patchUserVote import
import { useNavigate, useParams } from "react-router";
import Vote from "../../assets/home/vote.jpg";
const VotePage = () => {
  const [result, setResult] = useState([]); // 메뉴 리스트
  const [randomMenu, setRandomMenu] = useState(""); // 선택된 랜덤 메뉴
  const { roomId } = useParams();
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

  const readMenu = async () => {
    try {
      const response = await getMenu(roomId, kakaoId);
      console.log("API Response:", response); // 전체 API 응답 확인

      // 메뉴 리스트와 선택된 메뉴 추출
      const menuList = response.data?.data || [];
      const selectedMenu = response.data?.selectedMenu || "";

      console.log("Menu List:", menuList); // menuList 확인
      console.log("Selected Menu:", selectedMenu); // 선택된 메뉴 확인

      setResult(menuList);
      setRandomMenu(selectedMenu); // 서버에서 받은 랜덤 메뉴 설정
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  const handleVote = async (vote) => {
    try {
      const response = await patchUserVote(roomId, kakaoId, vote); // 1: 좋다, 0: 안 좋다
      console.log(`투표 요청: vote=${vote}`);
      console.log(`투표 ${vote === 1 ? "좋다" : "안 좋다"} 성공:`, response);
      alert(`"${randomMenu}"에 대한 투표가 완료되었습니다.`);
    } catch (err) {
      console.error("투표 실패:", err);
      alert("투표 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    readMenu();
  }, [roomId]);

  return (
    <Layout>
      <BackHeaderComponent />
      <ImageContainer>
        <Image src={Vote} alt="IMAGE" />
        {randomMenu && <RandomMenu>{randomMenu}</RandomMenu>}
      </ImageContainer>
      <VoteButtons>
        <VoteButton onClick={() => handleVote(1)}>좋다</VoteButton>
        <VoteButton onClick={() => handleVote(0)}>안 좋다</VoteButton>
      </VoteButtons>
      <ResultList>
        <Text>
          <strong>퀴즈 맞춘 사람들이 먹고싶은 메뉴</strong>
        </Text>
        {Array.isArray(result) &&
          result.map((item, index) => (
            <ResultItem key={index}>{item}</ResultItem>
          ))}
      </ResultList>
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/roomdetail/${roomId}`)}
      />
    </Layout>
  );
};

export default VotePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 80px;
  width: 375px;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
`;

const RandomMenu = styled.div`
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 19px;
  font-weight: bold;
  color: red;
  background: var(--gray-100);
  padding: 6px 6px;
  border-radius: 10px;
  text-align: center;
`;

const VoteButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const VoteButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: var(--purple-pri);
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const ResultList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: center;
`;

const ResultItem = styled.li`
  font-size: 15px;
  color: var(--black);
  margin: 10px 0;
`;

const Text = styled.div`
  font-size: 17px;
`;

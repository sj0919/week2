import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useState, useEffect } from "react";
import { getVoteResult } from "../../api/room";
import { useNavigate, useParams } from "react-router";

const VoteResultPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [voteResult, setVoteResult] = useState(null); // 투표 결과 상태
  const [message, setMessage] = useState(""); // 성공/실패 메시지

  const fetchVoteResult = async () => {
    try {
      const response = await getVoteResult(roomId);
      console.log("투표 결과 반환:", response);

      const result = response.data?.data;

      if (result === 1) {
        setMessage("투표에 성공했습니다!");
      } else {
        setMessage("투표에 실패했습니다.");
      }

      setVoteResult(result);
    } catch (err) {
      console.error("투표 결과 확인 실패:", err);
      setMessage("투표 결과를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchVoteResult();
    }
  }, [roomId]);

  return (
    <Layout>
      <BackHeaderComponent />
      <Content>
        <ResultMessage>{message}</ResultMessage>
        <BottomButtonComponent
          text="홈으로 돌아가기"
          onClick={() => navigate("/home")}
        />
      </Content>
    </Layout>
  );
};

export default VoteResultPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ResultMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ children }) =>
    children === "투표에 성공했습니다!" ? "green" : "red"};
  margin-bottom: 20px;
`;

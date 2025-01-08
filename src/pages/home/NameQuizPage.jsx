import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useState, useEffect } from "react";
import { getRandomPic, patchQuiz } from "../../api/room"; // patchQuiz import
import { useNavigate, useParams } from "react-router";

const NameQuizPage = () => {
  const [result, setResult] = useState(""); // 자신이 고른 메뉴
  const [text, setText] = useState(""); // 한줄 어필
  const [randomPic, setRandomPic] = useState(""); // 랜덤 사진
  const [answer, setAnswer] = useState(""); // 랜덤 사진 이름
  const [userInput, setUserInput] = useState(""); // 사용자의 입력값
  const navigate = useNavigate();

  const { roomId } = useParams();
  const { kakaoId } = useParams();

  // 랜덤 사진 가져오기 API 연결
  const readRandomPic = async () => {
    try {
      const response = await getRandomPic(roomId);
      setRandomPic(response.data.data.picture_path);
      setAnswer(response.data.data.name);
      console.log("랜덤 사진:", randomPic);
      console.log("정답:", answer);
    } catch (err) {
      console.error("랜덤 사진 가져오기 실패:", err);
    }
  };

  // 퀴즈 결과 업데이트
  const updateQuizResult = async (quizResult) => {
    try {
      const response = await patchQuiz(roomId, kakaoId, { quiz: quizResult });
      console.log("퀴즈 결과 업데이트 성공:", response);
    } catch (err) {
      console.error("퀴즈 결과 업데이트 실패:", err);
    }
  };

  useEffect(() => {
    readRandomPic();
  }, []);

  const handleSubmit = async () => {
    const isCorrect = userInput.trim().toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
      await updateQuizResult(1); // 퀴즈 결과를 1로 설정 (성공)
      navigate(`/correct/${roomId}/${kakaoId}`);
    } else {
      await updateQuizResult(0); // 퀴즈 결과를 0으로 설정 (실패)
      navigate(`/wrong/${roomId}/${kakaoId}`);
    }
  };

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <Text>{result}</Text>
        <Text>{text}</Text>
        <Text>퀴즈 이름 맞추기</Text>
        <QuizContainer>
          <ImageWrapper
            src={`${process.env.REACT_APP_BASE_URL}${randomPic}`}
            alt="랜덤 사진"
          ></ImageWrapper>
          <Text>이 사람의 이름은?</Text>
          <Textarea
            placeholder="입력!!"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></Textarea>
        </QuizContainer>
      </ContentContainer>
      <BottomButtonComponent text="안틀릴 자신 있어?" onClick={handleSubmit} />
    </Layout>
  );
};

export default NameQuizPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-top: 30px;
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--purple-pri);
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 100px;
`;

const ImageWrapper = styled.img`
  display: flex;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 50%;
  background-color: var(--gray-200);
  margin-bottom: 40px;
`;

const Textarea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 76px;
  height: 24px;
  resize: none;
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  padding-top: 7px;
  padding-left: 33px;
  &::placeholder {
    color: var(--gray-300);
    font-size: 14px;
  }
`;

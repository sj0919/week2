import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useState, useEffect } from "react";
import { getRandomPic } from "../../api/room";
import { useNavigate, useParams } from "react-router";

const NameQuizPage = () => {
  const [result, setResult] = useState(""); //자신이 고른 메뉴
  const [text, setText] = useState(""); //한줄어필
  const [randomPic, setRandomPic] = useState(""); //랜덤사진
  const [answer, setAnswer] = useState(""); //랜덤사진 이름
  const [userInput, setUserInput] = useState(""); //사용자의 입력값값
  const navigate = useNavigate();

  const roomId = 3;
  const { kakaoId } = useParams();

  //랜덤 사진 고르기 API 연결결
  const readRandomPic = async () => {
    try {
      const response = await getRandomPic(roomId);
      setRandomPic(response.data.data.picture_path);
      setAnswer(response.data.data.name);
      console.log(randomPic);
      console.log(answer);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    readRandomPic();
  }, []);

  const handleSubmit = () => {
    if (userInput.trim().toLowerCase() === answer.toLowerCase()) {
      navigate(`/correct/${roomId}/${kakaoId}`);
    } else {
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
          <ImageWrapper src={`https://172.10.7.65${randomPic}`}></ImageWrapper>
          <Text>이사람의 이름은?</Text>
          <Textarea
            placeholder="이름 입력"
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
  font-size: 16px;
  font-weight: 600;
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
  width: 178px;
  height: 178px;
  object-fit: cover;
  border-radius: 50%;
  background-color: var(--gray-200);
`;
const Textarea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 24px;
  resize: none;
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  padding-top: 7px;
  padding-left: 18px;
  &::placeholder {
    color: var(--gray-300);
    font-size: 14px;
  }
`;

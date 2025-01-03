import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
const NameQuizPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <Text>마라탕 어때요?</Text>
      <Text>마라탕최고최고짱짱짱제발요</Text>
      <Text>퀴즈 이름 맞추기</Text>
      <QuizContainer>
        <ImageWrapper></ImageWrapper>
        <Text>이사람의 이름은?</Text>
        <Textarea placeholder="이름을 입력하세요"></Textarea>
      </QuizContainer>
    </Layout>
  );
};
export default NameQuizPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 40px;
`;
const ImageWrapper = styled.div`
  display: flex;
  width: 178px;
  height: 178px;
  border-radius: 50%;
  background-color: var(--gray-200);
`;
const Textarea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 160px;
  height: 24px;
  resize: none;
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  padding-top: 7px;
  padding-left: 40px;
  &::placeholder {
    color: var(--gray-300);
    font-size: 14px;
  }
`;

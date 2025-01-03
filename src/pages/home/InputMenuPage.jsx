import styled from "styled-components";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
const InputMenuPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <Form>
          <Fieldset>
            <Legend>먹고싶은메뉴</Legend>
            <Textarea />
          </Fieldset>
          <Fieldset>
            <Legend>메뉴 한줄 어필</Legend>
            <Textarea />
          </Fieldset>
        </Form>
        <BottomButtonComponent text="등록" />
      </ContentContainer>
    </Layout>
  );
};

export default InputMenuPage;

const Layout = styled.div``;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-top: 10px;
`;

const Legend = styled.legend`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

const Textarea = styled.textarea`
  display: flex;
  width: 330px;
  height: 20px;
  padding: 10px;
  border-color: var(--gray-300);
  border-radius: 10px;
  font-size: 15px;
  resize: none;
`;

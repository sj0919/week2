import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
const CreateRoomPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <Form>
        <Fieldset>
          <Legend>방 이름</Legend>
          <Textarea />
        </Fieldset>
        <Fieldset>
          <Legend>멤버 초대</Legend>
          <MemberContainer>
            <TextInputContainer>
              <NicknameTextarea></NicknameTextarea>
              <InviteButton>초대</InviteButton>
            </TextInputContainer>
          </MemberContainer>
        </Fieldset>
      </Form>
      <BottomButtonComponent />
    </Layout>
  );
};
export default CreateRoomPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
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
const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 331px;
  height: 257px;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  padding: 8px;
`;
const TextInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 36px;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
`;
const NicknameTextarea = styled.textarea`
  width: 250px;
  height: 30px;
  margin-left: 10px;
  border-radius: 0px;
  border: 0px;
  resize: none;
  &
`;
const InviteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 25px;
  background-color: var(--purple-pri);
  color: var(--white);
  border: 0px;
  border-radius: 11px;
  margin-right: 8px;
`;

import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import MemberItem from "../../components/home/MemberItem";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateRoomPage = () => {
  const dummyData = [
    { name: "홍길동", id: 1, nickname: "gildong" },
    { name: "홍길동", id: 2, nickname: "gildong" },
    { name: "홍길동", id: 3, nickname: "gildong" },
    { name: "홍길동", id: 4, nickname: "gildong" },
  ];
  const [results, setResults] = useState(dummyData);
  const navigate = useNavigate();

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <Form>
          <Fieldset>
            <Legend>방 이름</Legend>
            <Textarea />
          </Fieldset>
          <Fieldset>
            <Legend>멤버 초대</Legend>
            <InviteContainer>
              <TextInputContainer>
                <NicknameTextarea></NicknameTextarea>
                <InviteButton>초대</InviteButton>
              </TextInputContainer>
              <MemberContainer>
                <Legend>초대현황</Legend>
                <MemberItemContainer>
                  {results &&
                    results.map((result) => {
                      return (
                        <MemberItem
                          key={result.id}
                          name={result.name}
                          nickname={result.nickname}
                          onClick={() => navigate(`/`)}
                        />
                      );
                    })}
                </MemberItemContainer>
              </MemberContainer>
            </InviteContainer>
          </Fieldset>
        </Form>
        <BottomButtonComponent text="완료" />
      </ContentContainer>
    </Layout>
  );
};
export default CreateRoomPage;

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
  font-weight: 600;
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
const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 331px;
  min-height: 100px;
  max-height: 500px;
  overflow-y: auto;
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
  margin-left: 4px;
`;
const NicknameTextarea = styled.textarea`
  width: 250px;
  height: 20px;
  margin-left: 10px;
  border-radius: 0px;
  border: 0px;
  resize: none;
  padding: px;
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
const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;
const MemberItemContainer = styled.div``;

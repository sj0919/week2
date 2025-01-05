import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useState } from "react";
import { useNavigate } from "react-router";
import MemberItem from "../../components/home/MemberItem";

const InviteMemberPage = () => {
  const [roomName, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState([]); // 초대된 멤버들을 관리하는 배열
  const navigate = useNavigate();
  // 멤버 초대 함수
  const inviteMember = () => {
    if (nickname) {
      const newMember = {
        id: results.length + 1, // 새로운 id는 results의 길이에 따라 자동으로 생성
        name: nickname, // nickname을 name으로 사용
        nickname: nickname, // nickname
      };
      setResults([...results, newMember]); // results 배열에 새 멤버 추가
      setNickname(""); // 초대 후 닉네임 입력란 초기화
    }
  };
  return (
    <Layout>
      <BackHeaderComponent />
      <Fieldset>
        <Legend>멤버 초대</Legend>
        <InviteContainer>
          <TextInputContainer>
            <NicknameTextarea
              value={name}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름을 입력하세요"
            />
            <InviteButton onClick={inviteMember}>초대</InviteButton>
          </TextInputContainer>
          <MemberContainer>
            <Legend>초대현황</Legend>
            <MemberItemContainer>
              {results.map((result) => (
                <MemberItem
                  key={result.id}
                  name={result.name}
                  nickname={result.nickname}
                  onClick={() => navigate(`/`)}
                />
              ))}
            </MemberItemContainer>
          </MemberContainer>
        </InviteContainer>
      </Fieldset>
      <BottomButtonComponent text="초대완료" onClick={() => "/home"} />
    </Layout>
  );
};
export default InviteMemberPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-top: 40px;
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
  padding: 4px;
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
const MemberItemContainer = styled.div``;
const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

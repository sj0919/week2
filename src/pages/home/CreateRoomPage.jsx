import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import MemberItem from "../../components/home/MemberItem";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postRoom } from "../../api/room";
const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState([]); // 초대된 멤버들을 관리하는 배열
  const navigate = useNavigate();

  // 방 생성 API 연결
  const createRoom = async (roomName) => {
    try {
      if (!roomName.trim()) {
        alert("방 이름을 입력해주세요.");
        return;
      }

      if (results.length === 0) {
        alert("초대할 멤버를 추가해주세요.");
        return;
      }

      const names = results.map((result) => result.name);
      await postRoom(roomName, names);
      navigate("/home");
    } catch (err) {
      console.error("Error creating room:", err);
      alert("방 생성 중 문제가 발생했습니다.");
    }
  };

  // 멤버 초대 함수
  const inviteMember = (e) => {
    e.preventDefault();
    if (name) {
      const newMember = {
        id: results.length + 1, // 새로운 id는 results의 길이에 따라 자동으로 생성
        name: name, // nickname을 name으로 사용
      };
      setResults([...results, newMember]); // results 배열에 새 멤버 추가
      setName(""); // 초대 후 닉네임 입력란 초기화
    }
  };

  // 멤버 삭제 함수
  const removeMember = (id) => {
    setResults(results.filter((result) => result.id !== id)); // 특정 id를 제외한 멤버만 남김
  };

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <Form>
          <Fieldset>
            <Legend>방 이름</Legend>
            <Textarea
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <Legend>멤버 초대</Legend>
            <InviteContainer>
              <TextInputContainer>
                <NicknameTextarea
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                      id={result.id} // id 전달
                      name={result.name}
                      onDelete={removeMember} // 삭제 함수 전달
                    />
                  ))}
                </MemberItemContainer>
              </MemberContainer>
            </InviteContainer>
          </Fieldset>
        </Form>
        <BottomButtonComponent
          text="완료"
          onClick={() => createRoom(roomName)}
        />
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
  padding: 4px;
`;
const InviteButton = styled.button.attrs({ type: "button" })`
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

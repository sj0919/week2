import styled from "styled-components";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import { updateMenu } from "../../api/room";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import menuPic from "../../assets/home/menu_pic.png";
import { useNavigate } from "react-router";

const InputMenuPage = () => {
  const [kakaoId, setKakaoId] = useState("");
  const { roomId } = useParams();
  const [menu, setMenu] = useState("");
  const [appeal, setAppeal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
  }, []);

  const handleUpdateMenu = async () => {
    try {
      if (!menu.trim() || !appeal.trim()) {
        alert("모든 정보를 입력해주세요.");
        return;
      }
      const response = await updateMenu(roomId, kakaoId, menu, appeal);
      console.log("response", response);
      alert("메뉴가 성공적으로 등록되었습니다.");
      navigate(`/roomdetail/${roomId}`);
    } catch (err) {
      console.error("Error updating menu:", err);
      alert("메뉴 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <BackHeaderComponent />
      <ContentContainer>
        <img src={menuPic} />
        <Form>
          <Fieldset>
            <Legend>먹고싶은 메뉴</Legend>
            <Textarea value={menu} onChange={(e) => setMenu(e.target.value)} />
          </Fieldset>
          <Fieldset>
            <Legend>메뉴 한줄 어필</Legend>
            <Textarea
              value={appeal}
              onChange={(e) => setAppeal(e.target.value)}
            />
          </Fieldset>
        </Form>
        <BottomButtonComponent text="등록" onClick={handleUpdateMenu} />
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
  margin-top: 60px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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

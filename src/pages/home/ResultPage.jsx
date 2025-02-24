import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Result from "../../assets/home/result_img.png";
import { useState, useEffect } from "react";
import { getMenu } from "../../api/room";
import { useNavigate, useParams } from "react-router";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";

const ResultPage = () => {
  const [result, setResult] = useState([]); // 메뉴 리스트
  const [randomMenu, setRandomMenu] = useState(""); // 선택된 랜덤 메뉴
  const { roomId } = useParams();
  const navigate = useNavigate();

  const readMenu = async () => {
    try {
      const response = await getMenu(roomId);
      console.log("API Response:", response); // 전체 API 응답 확인

      // 메뉴 리스트와 선택된 메뉴 추출
      const menuList = response.data?.data || [];
      const selectedMenu = response.data?.selectedMenu || "";

      console.log("Menu List:", menuList); // menuList 확인
      console.log("Selected Menu:", selectedMenu); // 선택된 메뉴 확인

      setResult(menuList);
      setRandomMenu(selectedMenu); // 서버에서 받은 랜덤 메뉴 설정
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    readMenu();
  }, [roomId]);

  return (
    <Layout>
      <BackHeaderComponent />
      <ImageContainer>
        <Image src={Result} alt="IMAGE" />
        {randomMenu && <RandomMenu>{randomMenu}</RandomMenu>}
      </ImageContainer>
      <ResultList>
        <Text>
          <strong>퀴즈 맞춘 사람들이 먹고싶은 메뉴</strong>
        </Text>
        {Array.isArray(result) &&
          result.map((item, index) => (
            <ResultItem key={index}>{item}</ResultItem>
          ))}
      </ResultList>
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/roomdetail/${roomId}`)}
      />
    </Layout>
  );
};

export default ResultPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  margin-top: 100px;
  width: 375px;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
`;

const RandomMenu = styled.div`
  position: absolute;
  top: 92%; /* 이미지의 중간 */
  left: 50%; /* 이미지의 중간 */
  transform: translate(-50%, -50%); /* 정중앙 정렬 */
  font-size: 19px;
  font-weight: bold;
  color: red;
  background: var(--gray-100);
  padding: 6px 6px;
  border-radius: 10px;
  text-align: center;
`;

const ResultList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: center;
`;

const ResultItem = styled.li`
  font-size: 15px;
  color: var(--black);
  margin: 10px 0;
`;

const Text = styled.div`
  font-size: 17px;
`;

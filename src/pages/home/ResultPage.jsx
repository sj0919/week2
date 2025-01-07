import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Result from "../../assets/home/result_img.png";
import { useState, useEffect } from "react";
import { getMenu } from "../../api/room";
import { useNavigate, useParams } from "react-router";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";

const ResultPage = () => {
  const [result, setResult] = useState([]);
  const [randomMenu, setRandomMenu] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();

  const readMenu = async () => {
    try {
      const response = await getMenu(roomId);
      console.log("API Response:", response); // 전체 API 응답 확인

      // `response.data`에서 `data` 필드 추출
      const menuData = response.data?.data;
      console.log("Menu Data:", menuData); // `data` 필드 확인

      // `menuData`가 문자열이면 배열로 변환
      const menuList = Array.isArray(menuData) ? menuData : [menuData];
      console.log("Menu List:", menuList); // menuList 확인

      setResult(menuList);

      if (menuList.length > 0) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const selectedMenu = menuList[randomIndex];
        console.log("Random Menu:", selectedMenu); // 선택된 메뉴 확인
        setRandomMenu(selectedMenu);
      }
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
      <Image src={Result} alt="IMAGE" />
      {randomMenu ? (
        <RandomMenu>{randomMenu}</RandomMenu>
      ) : (
        <p>랜덤 메뉴가 없습니다.</p>
      )}
      <ResultList>
        {Array.isArray(result) &&
          result.map((item, index) => (
            <ResultItem key={index}>{item}</ResultItem>
          ))}
      </ResultList>
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/home`)}
      />
    </Layout>
  );
};

export default ResultPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  margin-top: 100px;
  width: 375px;
`;

const RandomMenu = styled.div`
  font-size: 20px;
  margin-top: 20px;
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
  font-size: 18px;
  font-weight: bold;
  color: var(--black);
  margin: 10px 0;
`;

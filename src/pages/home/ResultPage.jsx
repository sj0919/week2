import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Result from "../../assets/home/result_img.png";
import { useState, useEffect } from "react";
import { getMenu } from "../../api/room";

const ResultPage = () => {
  //답 맞춘사람 리스트
  const [result, setResult] = useState([]);

  //랜덤메뉴 하나 고르기
  const [randomMenu, setRandomMenu] = useState("");

  const roomId = 1;

  const readMenu = async () => {
    try {
      const response = await getMenu(roomId);
      const menuList = response.data;
      setResult(menuList);

      if (menuList.length > 0) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        setRandomMenu(menuList[randomIndex]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    readMenu();
  }, [roomId]);

  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Result} alt="IMAGE" />
      {randomMenu && <RandomMenu>{randomMenu}</RandomMenu>}
      <ResultList>
        {result.map((item, index) => (
          <ResultItem key={index}>{item}</ResultItem>
        ))}
      </ResultList>
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

const RandomMenu = styled.div``;
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

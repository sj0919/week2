import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import NotificationItem from "../../components/notice/NotificationItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getNotice } from "../../api/notice";

const NoticePage = () => {
  const navigate = useNavigate();
  const [kakaoId, setKakaoId] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, [kakaoId]);

  const readNotice = async () => {
    try {
      const response = await getNotice(kakaoId);
      const notiList = response.data.data;
      setResults(notiList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    readNotice();
  }, [kakaoId]);
  return (
    <Layout>
      <TopBar />
      <NavigationBar />
      {results &&
        results.map((result) => (
          <NotificationItem
            key={result.id}
            title={result.room_name}
            detail={result.message}
          />
        ))}
    </Layout>
  );
};

export default NoticePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

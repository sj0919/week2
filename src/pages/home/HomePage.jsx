import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import NavigationBar from "../../components/common/NavigationBar";
import RoomItem from "../../components/home/RoomItem";
import { useNavigate } from "react-router";
import { getRoom } from "../../api/room";
import Slider from "react-slick"; // react-slick 사용
import "slick-carousel/slick/slick.css"; // slick 스타일
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../../assets/home/banner1.png";
import Banner2 from "../../assets/home/banner2.png";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [newMember, setNewMember] = useState("");
  const navigate = useNavigate();

  const [kakaoId, setKakaoId] = useState("");

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, []);

  // 방 list 불러오는 API
  const readRoomList = async () => {
    try {
      const response = await getRoom(kakaoId);
      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        const rooms = response.data.data.flatMap((item) =>
          (item.roomInfo || []).map((room) => ({
            ...room,
            members: item.names.join(", "), // 참가자 정보를 문자열로 변환
          }))
        );
        setResults(rooms); // 결합된 데이터 설정
        console.log("Processed Rooms:", rooms);
      } else {
        console.error("Invalid data format:", response.data);
        setResults([]);
      }
    } catch (err) {
      console.error("Error fetching room list:", err);
      setResults([]);
    }
  };

  useEffect(() => {
    if (kakaoId) {
      readRoomList();
    }
  }, [kakaoId]);

  // 슬라이드 설정
  const sliderSettings = {
    dots: true, // 하단 점 네비게이션
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000,
  };

  return (
    <Layout>
      <TopBar />
      <SliderWrapper>
        <Slider {...sliderSettings}>
          <BannerImage src={Banner1} alt="배너 1" />
          <BannerImage src={Banner2} alt="배너 2" />
          <BannerImage src={Banner1} alt="배너 3" />
        </Slider>
      </SliderWrapper>
      <TopContainer>
        <TextWrapper>새로운 방을 만들고 싶으신가요?</TextWrapper>
        <ButtonWrapper onClick={() => navigate("/createroom")}>
          방 생성
        </ButtonWrapper>
      </TopContainer>
      {results &&
        results.map((result) => (
          <RoomItem
            key={result.id}
            title={result.name}
            member={result.members} // 수정된 member 전달
            onClick={() => navigate(`/roomdetail/${result.id}`)}
          />
        ))}
      <NavigationBar />
    </Layout>
  );
};
export default HomePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SliderWrapper = styled.div`
  margin: 0px 0;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px;
  gap: 20px;
`;
const TextWrapper = styled.span`
  size: 16px;
  font-weight: 600;
`;
const ButtonWrapper = styled.button`
  width: 62px;
  height: 28px;
  background-color: var(--purple-pri);
  border-radius: 8px;
  color: var(--white);
  border: none;
`;

import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import NavigationBar from "../../components/common/NavigationBar";
import RoomItem from "./RoomItem";
import { useNavigate } from "react-router";

const HomePage = () => {
  const dummyData = [
    { title: "몰입캠프 4분반", id: 1, member: "홍길동,김철수,,,," },
    { title: "Room 2", id: 2, member: "홍길동,김철수,,,," },
    { title: "Room 3", id: 3, member: "홍길동,김철수,,,," },
  ];

  const [results, setResults] = useState(dummyData);
  const navigate = useNavigate();
  const onChange = (e) => {
    setResults(e.target.value);
  };
  return (
    <Layout>
      <TopBar />
      <TopContainer>
        <TextWrapper>새로운 방을 만들고 싶으신가요?</TextWrapper>
        <ButtonWrapper>방 생성</ButtonWrapper>
      </TopContainer>
      {results &&
        results.map((result, index) => (
          <RoomItem
            key={result.id}
            title={result.title}
            member={result.member}
            onClick={() => navigate(`/`)}
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

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px;
  gap: 20px;
`;
const TextWrapper = styled.span`
  size: 16px;
`;
const ButtonWrapper = styled.button`
  background-color: var(--purple-pri);
  border-radius: 8px;
  color: var(--white);
  border: none;
`;

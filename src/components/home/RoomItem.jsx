import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/home/arrow.svg";

const RoomItem = ({ title, member, onClick }) => {
  return (
    <Layout>
      <ResultItem onClick={onClick}>
        <TextContainer>
          <Title>{title}</Title>
          <Participants>{member}</Participants>
        </TextContainer>
        <Arrow />
      </ResultItem>
    </Layout>
  );
};

export default RoomItem;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ResultItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff; /* 흰색 배경 */
  border: 0px solid var(--purple-sec); /* 기존 테두리 제거 */
  border-radius: 10px;
  width: 347px;
  height: 79px;
  padding: 13px;
  margin: 7px;
  box-shadow: 0px 0px 10px 3px var(--purple-sec); /* 그림자 색상 설정 */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 550;
  padding-bottom: 4px;
  color: var(--purple-pri);
`;
const Participants = styled.span`
  font-size: 14px;
`;

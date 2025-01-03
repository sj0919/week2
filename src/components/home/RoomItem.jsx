import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/home/arrow.svg";

const RoomItem = ({ item, title, member, onClick }) => {
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
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  width: 329px;
  height: 79px;
  padding: 13px;
  margin: 7px;
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
`;
const Participants = styled.span`
  font-size: 14px;
`;

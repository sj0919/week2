import React from "react";
import styled from "styled-components";
import { ReactComponent as Alarm } from "../../assets/home/alarm_icn.svg";

const ParticipantSlider = () => {
  const dummyParticipants = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김철수" },
    { id: 3, name: "이영희" },
    { id: 4, name: "박지수" },
    { id: 5, name: "최민수" },
  ];

  return (
    <Layout>
      <Title>멤버</Title>
      <Container>
        <Slider>
          {dummyParticipants.map((participant) => (
            <Participant key={participant.id}>
              <Avatar />
              <NameContainer>
                {participant.name}
                <Alarm />
              </NameContainer>
            </Participant>
          ))}
        </Slider>
      </Container>
    </Layout>
  );
};

export default ParticipantSlider;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items;center; 
 `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 330px;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  padding: 8px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
`;

const Slider = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--gray-300);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background: var(--gray-100);
  }
`;

const Participant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--gray-200);
  border-radius: 50%;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  font-size: 13px;
  text-align: center;
`;

import React from "react";
import styled from "styled-components";
import { ReactComponent as Alarm } from "../../assets/home/alarm_icn.svg";

const ParticipantSlider = ({ names = [] }) => {
  return (
    <Layout>
      <Title>멤버</Title>
      <Container>
        <Slider>
          {names.length > 0 ? (
            names.map((name, index) => (
              <Participant key={index}>
                <Avatar
                //src={`http://172.10.7.69:3000/uploads/${kakaoId}.jpg`}
                />
                <NameContainer>
                  {name}
                  <Alarm />
                </NameContainer>
              </Participant>
            ))
          ) : (
            <NoParticipants>참여자가 없습니다.</NoParticipants>
          )}
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

const Avatar = styled.img`
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

const NoParticipants = styled.p`
  color: var(--gray-400);
  font-size: 14px;
`;

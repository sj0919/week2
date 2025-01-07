import React from "react";
import styled from "styled-components";
import { ReactComponent as Alarm } from "../../assets/home/alarm_icn.svg";
import { postUser } from "../../api/user";

const ParticipantSlider = ({ names = [], profiles = [], roomId }) => {
  const handleAlarmClick = async (userId1, userId2) => {
    try {
      const response = await postUser(roomId, userId1, userId2);
      console.log("멤버 호출 완료:", response.data);
      alert(
        `${response.data.data.user1_name}님이 ${response.data.data.user2_name}님을 호출했습니다!`
      );
    } catch (err) {
      console.error("멤버 호출 실패:", err);
      alert("멤버 호출에 실패했습니다.");
    }
  };

  return (
    <Layout>
      <Title>멤버</Title>
      <Container>
        <Slider>
          {names.length > 0 ? (
            names.map((name, index) => {
              const profileURL = `https://api.hmhgmg.r-e.kr/uploads/${profiles[index]}.jpg`;

              return (
                <Participant key={index}>
                  <Avatar src={profileURL} alt={`${name}의 아바타`} />
                  <NameContainer>
                    {name}
                    <AlarmIcon
                      onClick={() =>
                        handleAlarmClick(
                          profiles[index], // 호출자 userId1
                          profiles[(index + 1) % profiles.length] // 호출 대상 userId2
                        )
                      }
                    />
                  </NameContainer>
                </Participant>
              );
            })
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
  align-items: center;
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
  object-fit: cover;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  font-size: 13px;
  text-align: center;
`;

const AlarmIcon = styled(Alarm)`
  cursor: pointer;
  margin-left: 5px;
`;

const NoParticipants = styled.p`
  color: var(--gray-400);
  font-size: 14px;
`;

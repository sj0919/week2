import React from "react";
import styled from "styled-components";
import { ReactComponent as Alarm } from "../../assets/home/alarm_icn.svg";
import { postAlim } from "../../api/notice"; // Use the correct API call

const ParticipantSlider = ({ names = [], profiles = [], roomId }) => {
  const handleAlarmClick = async (userId1, userId2) => {
    try {
      const response = await postAlim(roomId, userId1, userId2); // Call the notification API
      const { room_name, user1_name, user2_name } = response.data.data;

      console.log("Notification Sent:", response.data);
      alert(
        `${user1_name}님이 ${user2_name}님을 호출했습니다! (방 이름: ${room_name})`
      );
    } catch (err) {
      console.error("Notification Failed:", err);
      alert("호출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Layout>
      <Title>멤버</Title>
      <Container>
        <Slider>
          {names.length > 0 ? (
            names.map((name, index) => {
              const profileURL = `${process.env.REACT_APP_BASE_URL}/uploads/${profiles[index]}.jpg`;

              return (
                <Participant key={index}>
                  <Avatar src={profileURL} alt={`${name}의 아바타`} />
                  <NameContainer>
                    {name}
                    <AlarmIcon
                      onClick={() =>
                        handleAlarmClick(
                          profiles[index], // Sender userId
                          profiles[(index + 1) % profiles.length] // Receiver userId
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 334px;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  padding: 8px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
  padding-left: 4px;
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

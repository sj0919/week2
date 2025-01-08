import { client } from "./api";

//방 생성
export const postRoom = async (name, names) => {
  try {
    const response = await client.post("/rooms", {
      name: name,
      names: names,
    });
    console.log("방 생성", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//방 목록 조회
export const getRoom = async (kakaoId) => {
  try {
    const response = await client.get(`/rooms_users/home1/${kakaoId}`);
    console.log("방 목록 조회", response);

    return response;
  } catch (err) {
    throw err;
  }
};

//방 세부 조회
export const getRoomDetail = async (roomId) => {
  try {
    const response = await client.get(`/rooms_users/home2/${roomId}`);
    console.log("방 세부 조회");
    return response;
  } catch (err) {
    throw err;
  }
};

//방에 멤버 추가초대
export const postMembers = async (roomId, names) => {
  try {
    const response = await client.post(`/rooms_users/invite/${roomId}`, {
      names: names,
    });
    console.log("멤버 초대");
    return response;
  } catch (err) {
    throw err;
  }
};

//방 나가기
export const delRoom = async (roomId, kakaoId) => {
  try {
    const response = await client.delete(`/rooms_users/${roomId}/${kakaoId}`);
    console.log("방 나가기 성공", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//회원별 메뉴,한줄 어필 작성
export const updateMenu = async (roomId, kakaoId, menu, appeal) => {
  try {
    const response = await client.patch(
      `/rooms_users/menu/${roomId}/${kakaoId}`,
      { menu: menu, appeal: appeal }
    );
    console.log("메뉴 작성 성공", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//사진 랜덤 반환
export const getRandomPic = async (roomId) => {
  try {
    const response = await client.get(`/users/${roomId}/randomImage`);
    console.log("사진 랜덤 반환 성공", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//퀴즈 맞춘놈 메뉴 리스트
export const getMenu = async (roomId) => {
  try {
    const response = await client.get(`/rooms_users/${roomId}/quiznommenu`);
    console.log("퀴즈 맞춘놈 메뉴 리스트", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//방 아이디에 따라 퀴즈 초기화
export const patchReset = async (roomId) => {
  try {
    const response = await client.patch(`/rooms_users/program/${roomId}`);
    console.log("초기화", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//회원별 퀴즈
export const patchQuiz = async (roomId, userId, quiz) => {
  try {
    const response = await client.patch(
      `/rooms_users/quiz/${roomId}/${userId}`,
      { quiz: quiz }
    );
    console.log("퀴즈", response);
    return response;
  } catch (err) {
    throw err;
  }
};
//랜덤 메뉴 방 DB에 저장
/*export const patchFinalMenu = async (roomId, menu) => {
  try {
    const response = await client.patch(`/rooms/${roomId}`, { menu: menu });
    console.log("랜덤메뉴 저장 성공", response);
    return response;
  } catch (err) {
    throw err;
  }
};
*/

//회원별 투표
export const patchUserVote = async (roomId, userId, vote) => {
  try {
    const response = await client.patch(
      `/rooms_users/vote/${roomId}/${userId}`,
      { vote }
    );
    console.log("회원별 투표 결과", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//투표 현황 반환
export const patchVoteResult = async (roomId) => {
  try {
    const response = await client.patch(`/rooms/vote/${roomId}`);
    console.log("투표 현황 반환", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//투표 결과 반환
export const getVoteResult = async (roomId) => {
  try {
    const response = await client.get(`/rooms_users/vote/result/${roomId}`);
    console.log("투표 결과 반환");
    return response;
  } catch (err) {
    throw err;
  }
};

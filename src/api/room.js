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

//방 삭제
export const delRoom = async (roomId) => {
  try {
    const response = await client.delete(`/rooms/${roomId}`);
    console.log("방 삭제", response);
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

/*
//방 나가기
export const deleteRoom = async (roomId, kakaoId) => {
  try {
    const response = await client.delete(`/rooms_users/${roomId}/${kakaoId}`);
    console.log("방 나가기 성공", response);
    return response;
  } catch (err) {
    throw err;
  }
};*/

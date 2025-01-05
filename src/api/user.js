import { client } from "./api";

//멤버조회
export const getUserInfo = async (kakao) => {
  try {
    const response = await client.get(`/users/${kakao}`);
    console.log("유저 정보:", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//회원정보 수정
export const patchUserInfo = async (kakao, name, nickname, introduce) => {
  try {
    const response = await client.patch(`/users/${kakao}`, {
      name: name,
      nickname: nickname,
      introduce: introduce,
    });
    console.log("유저정보:", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

//로그아웃
export const postLogout = async (kakao) => {
  try {
    const response = await client.post(`/users/${kakao}/logout`);
    console.log("로그아웃", response);
    return response;
  } catch (err) {
    throw err;
  }
};

//회원탈퇴
export const delUser = async (kakao) => {
  try {
    const response = await client.delete(`/users/${kakao}/delete`);
    console.log("회원탈퇴", response);
    return response;
  } catch (err) {
    throw err;
  }
};

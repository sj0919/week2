import { client } from "./api";

//알림 확인
export const getNotice = async (kakaoId) => {
  try {
    const response = await client.get(`/notifications/${kakaoId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

//호출 API
export const postAlim = async (roomId, kakaoId1, kakaoId2) => {
  try {
    const response = await client.post(
      `/alims/send/${roomId}/${kakaoId1}/${kakaoId2}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//호출 API read
export const getAlim = async (kakaoId) => {
  try {
    const response = await client.get(`/alims/${kakaoId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

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

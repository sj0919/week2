import { client } from "./api";

//알림 확인
export const getNotice = async (userId) => {
  try {
    const response = await client.get(`/notifications/${userId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

import { apiTwoInstance } from "../api/axiosInstance";
import type { Message } from "../types/message.type";

export const API_TWO_SERVICES = {
  sendMessage: async (data: Partial<Message>) => {
    const res = await apiTwoInstance.post("/messaging/send", data);
    return res.data;
  },
};

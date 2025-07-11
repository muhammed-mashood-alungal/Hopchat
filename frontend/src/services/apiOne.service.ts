import { apiOneInstance } from "../api/axiosInstance";
import type { Message } from "../types/message.type";

export const API_ONE_SERVICES = {
  sendMessage: async (data: Partial<Message>) => {
    const res = await apiOneInstance.post("/messaging/send", data);
    return res.data;
  },
};

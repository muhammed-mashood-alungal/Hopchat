import { useContext } from "react";
import { SocketContext } from "../contexts/socket.context";
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
};

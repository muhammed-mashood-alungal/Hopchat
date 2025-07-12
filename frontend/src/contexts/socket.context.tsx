import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  clientOneSocket: Socket | null;
  clientTwoSocket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [clientOneSocket, setClientOneSocket] = useState<Socket | null>(null);
  const [clientTwoSocket, setClientTwoSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const { VITE_APP_CLIENT_1_URL, VITE_APP_CLIENT_2_URL } = import.meta.env;
    const clientOneSocket = io(VITE_APP_CLIENT_1_URL);
    const clientTwoSocket = io(VITE_APP_CLIENT_2_URL);

    setClientOneSocket(clientOneSocket);
    setClientTwoSocket(clientTwoSocket);
    return () => {
      clientOneSocket.disconnect();
      clientTwoSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ clientOneSocket, clientTwoSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

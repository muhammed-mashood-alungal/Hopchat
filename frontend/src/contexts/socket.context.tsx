import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

const { VITE_APP_CLIENT_1_URL, VITE_APP_CLIENT_2_URL } = import.meta.env;

interface SocketContextType {
  clientOneSocket: Socket | null;
  clientTwoSocket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [clientOneSocket, setClientOneSocket] = useState<Socket | null>(null);
  const [clientTwoSocket, setClientTwoSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const clientOneSocket = io(VITE_APP_CLIENT_1_URL);
    const clientTwoSocket = io(VITE_APP_CLIENT_2_URL);
    
    setClientOneSocket(clientOneSocket);
    setClientTwoSocket(clientTwoSocket);
    return () => {
      clientOneSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ clientOneSocket, clientTwoSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
};

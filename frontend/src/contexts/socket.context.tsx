import { createContext, useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  clientOneSocket: Socket | null;
  clientTwoSocket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [clientOneSocket, setClientOneSocket] = useState<Socket | null>(null);
  const [clientTwoSocket, setClientTwoSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // const {   VITE_APP_URL } =
    //   import.meta.env;

    const clientOneSocket = io('https://hopchat.mashood.site', {
      path: "/client-a/socket.io",
      transports: ["websocket"],
    });
    const clientTwoSocket = io('https://hopchat.mashood.site', {
      path: "/client-b/socket.io",
      transports: ["websocket"],
    });

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

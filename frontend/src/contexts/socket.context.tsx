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
    const { VITE_APP_CLIENT_1_URL , VITE_APP_CLIENT_2_URL } = import.meta.env;
    const clientOneSocket = io(VITE_APP_CLIENT_1_URL, {
      path: "/client-a/socket.io",
      transports: ["websocket"], 
    });

    const clientTwoSocket = io(VITE_APP_CLIENT_2_URL, {
      path: "/client-b/socket.io",
      transports: ["websocket"],
    });

    clientOneSocket.on('connect', () => {
      console.log('Frontend - Connected to Server_1 WebSocket:', VITE_APP_CLIENT_1_URL);
    });
    clientOneSocket.on('connect_error', (error) => {
      console.error('Frontend - Server_1 WebSocket connection error:', error.message);
    });
    clientOneSocket.on('disconnect', (reason) => {
      console.log('Frontend - Server_1 WebSocket disconnected:', reason);
    });
    clientOneSocket.on('message', (data) => {
      console.log('Frontend - Received message from Server_1:', data);
    });

    
    clientTwoSocket.on('connect', () => {
      console.log('Frontend - Connected to Server_2 WebSocket:', VITE_APP_CLIENT_2_URL);
    });
    clientTwoSocket.on('connect_error', (error) => {
      console.error('Frontend - Server_2 WebSocket connection error:', error.message);
    });
    clientTwoSocket.on('disconnect', (reason) => {
      console.log('Frontend - Server_2 WebSocket disconnected:', reason);
    });
    clientTwoSocket.on('message', (data) => {
      console.log('Frontend - Received message from Server_2:', data);
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

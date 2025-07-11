import { Send, Users, Wifi } from "lucide-react";
import type { Message } from "../types/message.type";
import type { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const ClientTab: React.FC<{
  clientId: string;
  otherClientId: string;
  isActive: boolean;
  socket: Socket | null;
}> = ({ clientId, otherClientId, isActive, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;
    // socket?.on("connection", () => {
    //   console.log("Connected");
    // });

    socket?.on("message", (data: Message) => {

      const newMessage: Message = {
        id: `${clientId}-${messages.length}`,
        type: "received",
        sender: data.sender,
        text: data.text,
        timestamp: data.timestamp,
      };
      setMessages((msgs:Message[])=>{
        const newMessages = [...msgs]
        newMessages.push(newMessage)
        return newMessages
      });

    });
  }, [socket]);

  return (
    <div className={`flex-1 ${isActive ? "block" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold">
                Client {clientId.slice(-1).toUpperCase()}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-green-500 bg-opacity-20">
                <Wifi className="h-3 w-3" />
                <span>Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.type === "sent"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      msg.type === "sent" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.type === "sent"
                      ? "You"
                      : `Client ${msg.sender.slice(-1).toUpperCase()}`}{" "}
                    • {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder={`Message to Client ${otherClientId
                .slice(-1)
                .toUpperCase()}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientTab;

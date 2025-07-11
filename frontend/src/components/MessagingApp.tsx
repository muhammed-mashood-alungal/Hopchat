import React, { useState } from "react";
import ClientTab from "./ClientTab";
import { useSocket } from "../contexts/socket.context";

const MessagingApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"clientA" | "clientB">("clientA");
  const { clientOneSocket, clientTwoSocket } = useSocket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            RabbitMQ Messaging System
          </h1>
          <p className="text-gray-600">
            Real-time client-to-client messaging App.
          </p>
        </div>

        <div className="flex space-x-1 ">
          {["clientA", "clientB"].map((client) => (
            <button
              key={client}
              onClick={() => setActiveTab(client as "clientA" | "clientB")}
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === client
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Client {client.slice(-1).toUpperCase()}
            </button>
          ))}
        </div>

        <div className="h-96 w-full">
          <ClientTab
            clientId="clientA"
            otherClientId="clientB"
            isActive={activeTab === "clientA"}
            socket={clientOneSocket}
          />
          <ClientTab
            clientId="clientB"
            otherClientId="clientA"
            isActive={activeTab === "clientB"}
            socket={clientTwoSocket}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingApp;

import React, { useState } from 'react';
import type { Message } from '../types/message.type';
import ClientTab from './ClientTab';
import { useSocket } from '../contexts/socket.context';


const MessagingApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clientA' | 'clientB'>('clientA');
  const {clientOneSocket , clientTwoSocket} = useSocket()
  
  const sampleMessages: Message[] = [
    {
      id: '1',
      sender: 'clientA',
      text: 'Hello Client B!',
      timestamp: '10:30 AM',
      type: 'sent'
    },
    {
      id: '2',
      sender: 'clientB',
      text: 'Hi Client A! How are you?',
      timestamp: '10:31 AM',
      type: 'received'
    }
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">RabbitMQ Messaging System</h1>
          <p className="text-gray-600">Real-time client-to-client messaging App.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 ">
          {['clientA', 'clientB'].map((client) => (
            <button
              key={client}
              onClick={() => setActiveTab(client as 'clientA' | 'clientB')}
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === client
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Client {client.slice(-1).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Client Tabs */}
        <div className="h-96 w-full">
          <ClientTab
            clientId="clientA"
            otherClientId="clientB"
            isActive={activeTab === 'clientA'}
            messages={sampleMessages}
            socket={clientOneSocket}
          />
          <ClientTab
            clientId="clientB"
            otherClientId="clientA"
            isActive={activeTab === 'clientB'}
            messages={sampleMessages}
            socket={clientTwoSocket}
          />
        </div>

        
      </div>
    </div>
  );
};

export default MessagingApp;
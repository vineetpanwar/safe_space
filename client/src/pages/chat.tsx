import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const messageToSend = newMessage;
      setNewMessage('');
      setMessages([...messages, { text: messageToSend, sender: 'user' }]);
      try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: messageToSend }),
          });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6"
      >
        <div className="overflow-auto h-96 mb-4 p-4 bg-gray-50 rounded">
          {messages.map((message, index) => (
            <div key={index} className={`p-2 my-2 rounded ${message.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border-2 border-gray-200 rounded"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </motion.div>
    </main>
  );
}
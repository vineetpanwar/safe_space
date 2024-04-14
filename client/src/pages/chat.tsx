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
            credentials: 'include',
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
    <main className="flex min-h-screen w-full items-center justify-center bg-purple-950 p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6"
      >
        <div className="overflow-auto h-96 mb-4 p-4 bg-gray-50 rounded">
          {messages.map((message, index) => (
            <div key={index} className={`p-3 my-2 max-w-xs mx-auto ${message.sender === 'user' ? 'bg-lightGreen rounded-br-none' : 'bg-purple rounded-bl-none'} float-${message.sender === 'user' ? 'right' : 'left'} clear-both`}>
              <span className="text-white">{message.text}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-4 clear-both">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 border-2 border-gray-200 rounded-l-lg"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-blue-500 text-white rounded-r-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </motion.div>
    </main>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import ChatBubble from '../../../components/ChatBubble';
import Link from 'next/link';

interface Message {
    text: string;
    sender: 'user' | 'system' | 'resource';
    link?: string;
  }
const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
          text: "Welcome to our SafeSpace! I'm BlissBuddy, your virtual assistant. Our priority is your well-being. Through engaging conversations, I'll help evaluate your mental health and offer personalized recommendations. To start, could you share how you are feeling today?",
          sender: "system"
        }
      ]);  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(1);
  const [showOptions, setShowOptions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentQuestion === 2) {
      setTimeout(() => {
        setShowOptions(true);
      }, 1000); // 1 second delay before showing options
    }
  }, [currentQuestion]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string = userInput) => {
    if (!text.trim()) return; // Prevent sending empty messages
    handleMessageClick(text);
    setUserInput(''); // Clear input after sending
  };

  const handleMessageClick = (message: string) => {
    const newUserMessage: Message = { text: message, sender: "user" };
    
    if (currentQuestion === 1) {
      setMessages((msgs) => [
        ...msgs,
        newUserMessage,
        {
          text: "I'm sorry to hear that you're feeling down. It's important to address these feelings. I'm here to support you through this assessment process and help you find ways to improve your mood. Let's begin with an assessment. How often do you feel overwhelmed or anxious?",
          sender: "system"
        }
      ]);
      setCurrentQuestion(2);
    } else if (currentQuestion === 2) {
      setMessages((msgs) => [
        ...msgs,
        newUserMessage,
        { text: "How would you rate your level of stress?", sender: "system" }
      ]);
      setCurrentQuestion(3);
    } else if (currentQuestion === 3) {
      setMessages((msgs) => [
        ...msgs,
        newUserMessage,
        {
          text: "Your mental health seems to be in good shape. Here are some resources you can explore to maintain a healthy mental well-being.",
          sender: "system"
        },
        {
          text: "Mental Health Resource 1",
          sender: "resource",
          link: "/articles/mental-health"
        },
        {
          text: "Mental Health Resource 2",
          sender: "resource",
          link: "/videos"
        },
        // ... include other resources as needed
      ]);
      setCurrentQuestion(null);
    }
  };
  

  const optionButtons = showOptions ? (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {(currentQuestion === 2 ? ['Rarely', 'Sometimes', 'Frequently', 'Constantly'] :
        currentQuestion === 3 ? ['Low', 'Moderate', 'High', 'Very High'] : [])
        .map((option) => (
          <button key={option} onClick={() => sendMessage(option)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {option}
          </button>
        ))}
    </div>
  ) : null;


  return (
    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <div className="w-full max-w-md max-h-[75vh] space-y-2 p-4 bg-white shadow-md rounded-lg overflow-y-auto">
        {messages.map((message, index) => {
          if (message.sender === 'resource' && message.link) {
            return (
              <div key={index} className="text-center py-2">
                <Link href={message.link as "/articles/mental-health" | "/videos"}>
                  <a className="inline-block bg-purple-200 hover:bg-purple-300 text-black font-bold py-2 px-4 rounded">
                    {message.text}
                  </a>
                </Link>
              </div>
            );
          }
          return <ChatBubble key={index} text={message.text} isUser={message.sender === "user"} />;
        })}
        <div ref={messagesEndRef} />
      </div>
      {optionButtons}
      {currentQuestion && !showOptions && (
        <div className="flex items-center w-full max-w-md mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow p-2 border-2 border-blue-300 rounded-l-lg focus:outline-none text-black"
            placeholder="Type your message..."
            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={() => sendMessage()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
            Send
          </button>
        </div>
      )}
    </div>
  );
  
  
};

export default Chat;

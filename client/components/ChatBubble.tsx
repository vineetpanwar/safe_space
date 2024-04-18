import React from 'react';

interface ChatBubbleProps {
  text: string;
  isUser: boolean;
  link?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser }) => {
  const userClasses = 'bg-green-500 text-white';
  const systemClasses = 'bg-purple-500 text-white';
  const baseClasses = 'max-w-3/4 mb-2 p-3 rounded-lg';

  const bubbleClasses = `${baseClasses} ${isUser ? userClasses + ' ml-auto' : systemClasses + ' mr-auto'}`;

  return (
    <>
      { !isUser ? (
        <div className="chat chat-start">
          <div className="chat-bubble bg-purple-500 text-white">{text}</div>
        </div>
      )
    :
      (
        <div className="chat chat-end">
          <div className="chat-bubble bg-green-500 text-white">{text}</div>
        </div>
      )
  }
    </>
  );
};

export default ChatBubble;

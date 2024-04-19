import React from 'react';

interface ChatBubbleProps {
  QuestionText?: string;
  AnswerText?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ QuestionText, AnswerText }) => {

  return (
    <>
    {
      QuestionText && 
        (<div className="chat chat-start">
          <div className="chat-bubble bg-purple-500 text-white">{QuestionText}</div>
        </div>)
    }
        {
          AnswerText &&
          (
            <div className="chat chat-end">
              <div className="chat-bubble bg-green-500 text-white">{AnswerText}</div>
            </div>
          )
        }
    </>
  );
};

export default ChatBubble;

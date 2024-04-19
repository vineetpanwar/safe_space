import React, { useState, useRef, useEffect } from 'react';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import ChatBubble from '../../../components/ChatBubble';
import MockAssessment from '../../../mocks/mock_assessment.json';
import { useRouter } from 'next/router';

interface MessageQue {
    QuestionText: string;
    Options: Array<any>,
    QID: string,
    recordedOption: string
  }
const Assessment = () => {
  const router = useRouter();
  const [messageQue, setMessageQue] = useState<MessageQue[]>([
      {
        QuestionText: "Welcome to our SafeSpace! I'm SafeSpace Buddy, your virtual assistant. Our priority is your well-being. Through engaging conversations, I'll help evaluate your mental health and offer personalized recommendations. To start, could you share how you are feeling today?",
        Options: [
          {
              "optionId": "1",
              "optionText": "anxiety"
          },
          {
              "optionId": "2",
              "optionText": "depression"
          },
          {
              "optionId": "3",
              "optionText": "moodDisorder"
          },
          {
              "optionId": "4",
              "optionText": "psychoticDisorder"
          },
          {
            "optionId": "5",
            "optionText": "personalityDisorder"
          }

        ],
        QID: "0",
        recordedOption: ""
      }
    ]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showOptions, setShowOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const handleRecordOption = (evt: any, optionId: string) => {
    const newMessageQue = Array.from(messageQue)
    messageQue[currentQuestion].recordedOption = optionId;
    setMessageQue(newMessageQue);
    setShowOptions(false);
    setLoading(true);
    if(currentQuestion !=0 && currentQuestion>=messageQue.length - 1) {
      // Make a api call to check the score
      const score = 'bad';
      if(score === 'bad') {
        // @ts-ignore
        router.push('/help/doctorsnearby?find=therapists')
      } else if(score === 'worse') {
        // @ts-ignore
        router.push('/help/doctorsnearby?find=psycologists')
      } else {
        router.push('/help/resources')
      }

    }
    if(currentQuestion == 0) {
      //fetch corresponding question set
      let assessmentSet: ({ QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; } | { QID: string; QuestionText: string; Options: { optionId: string; optionText: string; }[]; recordedOption: string; })[] = [];
      for (const [key, value] of Object.entries(MockAssessment)) {
        if(`${messageQue[0].Options.filter(curr => curr.optionId === optionId)[0].optionText}Set`=== key) {
          assessmentSet = Object.values(value);
        }
      }
      const newMessageQue = [...Array.from(messageQue), ...assessmentSet];
      setTimeout(() => {
        setMessageQue(newMessageQue)
      },1500);
    }
    setTimeout(() => {
      setLoading(false);
      setCurrentQuestion(currentQuestion+1)
    },1500);
    setTimeout(() => {
      setShowOptions(true);
    }, 2000)
  }

  // Scroll to the bottom of the chat to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageQue]);

  const optionButtons = showOptions ? (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {
        messageQue[currentQuestion] && messageQue[currentQuestion].Options.map((option, index) => {
            return (
            <button key={option.optionId} onClick={(evt) => handleRecordOption(evt, option.optionId)} className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-[#240E57] duration-300 bg-green-500 text-white font-bold py-2 px-4 rounded">
              {option.optionText}
            </button>
          )
            })
      }
      </div>
  ) : null;

  return (
    <div className="flex flex-col pt-10 items-center justify-center w-full bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <div className="w-full mt-[5rem] max-h-[60vh] space-y-2 px-[20%] shadow-md rounded-lg overflow-y-auto">
        {messageQue.map((message, index) => {
          return ((index <= currentQuestion) ? (<ChatBubble key={index} QuestionText={message.QuestionText} AnswerText={message.recordedOption ? message.Options.filter(curr => curr.optionId === message.recordedOption)[0].optionText : ''}/>) : null);
        })}
        {loading && <span className="loading loading-dots loading-lg"></span>}
        <div ref={messagesEndRef} />
      </div>
      {showOptions && optionButtons}
    </div>
  );
  
};

export default Assessment;

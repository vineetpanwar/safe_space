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
              "optionText": "moodDisorder"
          },
          {
              "optionId": "3",
              "optionText": "psychoticDisorder"
          },
          {
            "optionId": "4",
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
    const [questionSet, setQuestionSet] = useState("");
    const base_url = 'https://developerapi-safe-space-jf39k9ups-my-team-e2f5cb6f.vercel.app'
    const API_URL = process.env.NEXT_PUBLIC_API_URL || base_url;


  const handleRecordOption = async (evt: any, optionId: string) => {
    const newMessageQue = Array.from(messageQue)
    messageQue[currentQuestion].recordedOption = optionId;
    setMessageQue(newMessageQue);
    setShowOptions(false);
    setLoading(true);
    if(currentQuestion !=0 && currentQuestion>=messageQue.length - 1) {
      const newArray = newMessageQue.slice(1);

      const data = {}
      console.log('vineet', newArray);
      newArray.forEach((curr) => {
        // @ts-ignore
        data[curr.QID] = curr;
      })
      const finalData = {
        [questionSet] : data
      }
      fetch(`${API_URL}/evaluate-score/${questionSet}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Make a api call to check the score
        const score = data["mental_health"];
        console.log("score", score);
        if(score === 'bad') {
          // @ts-ignore
          router.push('/help/doctorsNearby?find=therapists')
        } else if(score === 'worse') {
          // @ts-ignore
          router.push('/help/doctorsNearby?find=psycologists')
        } else {
          router.push('/help/resources')
        }
        console.log('Response Body:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });


    }
    if(currentQuestion == 0) {
      //fetch corresponding question set
      // @ts-ignore
      const testSet = messageQue[currentQuestion].Options.filter((curr:any) => curr.optionId === optionId )[0].optionText;
      setQuestionSet(`${testSet}Set`);
      const response = await fetchData(`${testSet}Set`);
      const newMessageQue = [...Array.from(messageQue), ...Object.values(response)];
      setTimeout(() => {
        // @ts-ignore
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


  async function fetchData(assessmentSet: string) {
    try {
      const response = await fetch(`${API_URL}/assessment?id=${assessmentSet}`);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
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

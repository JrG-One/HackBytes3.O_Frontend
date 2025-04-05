import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup } from "@/components/ui/resizable";
import ConversationPanel from '../components/interviewPage/ConservationPanel';
import ResponsePanel from '../components/interviewPage/ResponsePanel';
import InterviewHeader from '../components/interviewPage/InterviewHeader';

const InterviewPage = () => {
  const [defaultLayout, setDefaultLayout] = useState([50, 50]);
  
  // Static state management using useState hooks
  const [conversation, setConversation] = useState([
    { id: 1, role: "assistant", content: "Hello! I'll be conducting your interview today. Let's get started with the first question." },
    { id: 2, role: "assistant", content: "Tell me about your experience with React and state management libraries." }
  ]);
  const [nextQuestionReady, setNextQuestionReady] = useState(true);
  const [interviewShouldEnd, setInterviewShouldEnd] = useState(false);
  const [generatingResponse, setGeneratingResponse] = useState(false);
  
  // Mock questions to cycle through
  const mockQuestions = [
    "How do you handle state management in large-scale React applications?",
    "Can you describe a challenging React project you've worked on?",
    "What's your approach to component design and reusability?",
    "How do you test your React components?",
    "Final question: What are your thoughts on React's future direction?"
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Handle sending messages
  const sendMessage = (content) => {
    // Add user message
    const newMessage = { id: Date.now(), role: "user", content };
    setConversation(prev => [...prev, newMessage]);
    setGeneratingResponse(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "Thank you for your response. That's helpful information."
      };
      setConversation(prev => [...prev, aiResponse]);
      setGeneratingResponse(false);
      setNextQuestionReady(true);
      
      // Enable "End Interview" when at last question
      if (currentQuestionIndex >= mockQuestions.length - 1) {
        setInterviewShouldEnd(true);
      }
    }, 1500);
  };
  
  // Generate a new question
  const generateNewQuestion = () => {
    if (!nextQuestionReady) return;
    
    setGeneratingResponse(true);
    setNextQuestionReady(false);
    
    // Simulate a delay for generating the next question
    setTimeout(() => {
      const nextQuestion = { 
        id: Date.now(), 
        role: "assistant", 
        content: mockQuestions[currentQuestionIndex]
      };
      
      setConversation(prev => [...prev, nextQuestion]);
      setGeneratingResponse(false);
      
      // Move to next question index
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Set interviewShouldEnd to true if this is the last question
      if (currentQuestionIndex === mockQuestions.length - 1) {
        setInterviewShouldEnd(true);
      }
    }, 1000);
  };
  
  // End the interview
  const endInterview = () => {
    if (!interviewShouldEnd) return;
    
    setGeneratingResponse(true);
    
    // Simulate ending the interview
    setTimeout(() => {
      alert("Interview completed! In a real app, you would be redirected to results page.");
      setGeneratingResponse(false);
      
      // Add a final message
      const finalMessage = { 
        id: Date.now(), 
        role: "assistant", 
        content: "Thank you for completing the interview. Your responses have been recorded."
      };
      setConversation(prev => [...prev, finalMessage]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <InterviewHeader 
        generateNewQuestion={generateNewQuestion}
        endInterview={endInterview}
        nextQuestionReady={nextQuestionReady}
        interviewShouldEnd={interviewShouldEnd}
      />
      
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1"
        onLayout={(sizes) => setDefaultLayout(sizes)}
      >
        <ConversationPanel 
          defaultSize={defaultLayout[0]} 
          conversation={conversation} 
          generatingResponse={generatingResponse}
        />
        
        <ResponsePanel 
          defaultSize={defaultLayout[1]} 
          sendMessage={sendMessage}
          generatingResponse={generatingResponse}
        />
      </ResizablePanelGroup>
    </div>
  );
};

export default InterviewPage;
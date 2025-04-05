import React, { useRef, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, CircleX, Send, Clock, Check, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// This component would be used with your existing store
const InterviewPage = () => {
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [defaultLayout, setDefaultLayout] = useState([50, 50]);
  
  // These would come from your useInterviewStore hook
  const conversation = [
    { id: 1, role: "assistant", content: "Hello! I'll be conducting your interview today. Let's get started with the first question." },
    { id: 2, role: "assistant", content: "Tell me about your experience with React and state management libraries." },
    { id: 3, role: "user", content: "I've been working with React for about 3 years now. I'm familiar with Redux, Context API, and recently I've been using Zustand for simpler state management." }
  ];
  
  const nextQuestionReady = true;
  const interviewShouldEnd = false;
  const generatingResponse = false;
  
  const generateNewQuestion = () => {
    // This would call your actual store function
    console.log("Generating new question");
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // This would call your actual store function
    console.log("Sending message:", userInput);
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      setIsTyping(false);
      setUserInput("");
    }, 2000);
  };

  const messageEndRef = useRef(null);
  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="p-4 border-b flex justify-between items-center bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Interview Session</h1>
          <Badge variant="outline" className="ml-2">In Progress</Badge>
        </div>
        
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={generateNewQuestion}
                  disabled={!nextQuestionReady}
                  variant={nextQuestionReady ? "default" : "outline"}
                  className="transition-all duration-300"
                >
                  Next Question
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {nextQuestionReady 
                  ? "Move to the next interview question" 
                  : "Please complete the current question first"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    // end interview logic here
                    console.log("End interview clicked");
                  }}
                  disabled={!interviewShouldEnd}
                  variant={interviewShouldEnd ? "destructive" : "outline"}
                  className="transition-all duration-300"
                >
                  End Interview
                  <CircleX className="ml-1 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {interviewShouldEnd 
                  ? "Complete the interview and view results" 
                  : "Please complete all required questions first"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1"
        onLayout={(sizes) => setDefaultLayout(sizes)}
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <div className="flex flex-col h-full">
            <div className="p-3 border-b">
              <h2 className="text-sm font-medium">Conversation</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-12">
                {conversation.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    ref={index === conversation.length - 1 ? messageEndRef : null}
                  >
                    <div className={`flex items-start gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}>
                      <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-primary" : "bg-muted"}`}>
                        <AvatarFallback>
                          {message.role === "user" ? "U" : "AI"}
                        </AvatarFallback>
                      </Avatar>
                      
                      <Card className={`${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <CardContent className="p-3">
                          <p className="text-sm">{message.content}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-muted">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <Card className="bg-muted">
                        <CardContent className="p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex flex-col h-full">
            <div className="p-3 border-b">
              <h2 className="text-sm font-medium">Your Response</h2>
            </div>
            <div className="flex flex-col h-full p-4">
              <form 
                onSubmit={sendMessage} 
                className="flex flex-col h-full"
              >
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your response here..."
                    className="resize-none h-full min-h-[12rem]"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={generatingResponse}
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    {userInput.length > 0 ? (
                      <span>{userInput.length} characters</span>
                    ) : null}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={generatingResponse || !userInput.trim()}
                    className="transition-all duration-300"
                  >
                    {generatingResponse ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default InterviewPage;
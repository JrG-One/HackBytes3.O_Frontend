import React, { useState } from 'react';
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Clock } from "lucide-react";

const ResponsePanel = ({ defaultSize, sendMessage, generatingResponse }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    sendMessage(userInput);
    setUserInput("");
  };

  return (
    <>
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={defaultSize} minSize={30}>
        <div className="flex flex-col h-full">
          <div className="p-3 border-b">
            <h2 className="text-sm font-medium">Your Response</h2>
          </div>
          <div className="flex flex-col h-full p-4">
            <form 
              onSubmit={handleSubmit} 
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
    </>
  );
};

export default ResponsePanel;
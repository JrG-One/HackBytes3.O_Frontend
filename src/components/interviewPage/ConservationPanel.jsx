import React, { useRef, useEffect } from 'react';
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ConversationPanel = ({ defaultSize, conversation, generatingResponse }) => {
  const messageEndRef = useRef(null);
  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <ResizablePanel defaultSize={defaultSize} minSize={30}>
      <div className="flex flex-col h-full">
        <div className="p-3 border-b">
          <h2 className="text-sm font-medium">Conversation</h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-12">
            {conversation.map((message, index) => (
              <MessageBubble 
                key={message.id || index}
                message={message}
                isLastMessage={index === conversation.length - 1}
                ref={index === conversation.length - 1 ? messageEndRef : null}
              />
            ))}
            
            {generatingResponse && <TypingIndicator />}
          </div>
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
};

export default ConversationPanel;
import React, { useRef, useEffect } from 'react';
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ConversationPanel = ({ defaultSize, conversation, generatingResponse }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <ResizablePanel defaultSize={defaultSize} minSize={30}>
      <div className="flex flex-col h-full">
        {/* Fixed Header */}
        <div className="p-3 border-b">
          <h2 className="text-sm font-medium">Conversation</h2>
        </div>

        {/* Scrollable Content Only */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4 py-2">
            <div className="space-y-4 pb-20">
              {conversation.map((message, index) => (
                <MessageBubble
                  key={message.id || index}
                  message={message}
                  isLastMessage={index === conversation.length - 1}
                />
              ))}

              {generatingResponse && <TypingIndicator />}

              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </ResizablePanel>
  );
};

export default ConversationPanel;
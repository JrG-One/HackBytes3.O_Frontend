import React, { forwardRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const MessageBubble = forwardRef(({ message, isLastMessage }, ref) => {
  const isUser = message.role === "user";
  
  return (
    <div
      ref={ref}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex items-start gap-3 max-w-[80%] ${
        isUser ? "flex-row-reverse" : ""
      }`}>
        <Avatar className={`h-8 w-8 ${isUser ? "bg-primary" : "bg-muted"}`}>
          <AvatarFallback>
            {isUser ? "U" : "AI"}
          </AvatarFallback>
        </Avatar>
        
        <Card className={`${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}>
          <CardContent className="p-3">
            <p className="text-sm">{message.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
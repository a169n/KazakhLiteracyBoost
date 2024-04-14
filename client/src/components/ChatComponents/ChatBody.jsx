import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

const ChatBody = ({
  chatMessages,
  isChatbotTyping,
  typingIndicatorMessage,
}) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-body h-80 overflow-y-auto px-4 py-2">
      {chatMessages.map((chat, index) => (
        <Message key={index} message={chat.message} type={chat.type} />
      ))}
      {isChatbotTyping && (
        <TypingIndicator typingIndicatorMessage={typingIndicatorMessage} />
      )}
    </div>
  );
};

export default ChatBody;

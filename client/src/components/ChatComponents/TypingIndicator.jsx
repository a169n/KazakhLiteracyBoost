import React from "react";

const TypingIndicator = ({ typingIndicatorMessage }) => {
  return (
    <div className="text-gray-500 text-sm italic">
      {typingIndicatorMessage}
      <span className="animate-bounce ml-1">&#8226;</span>
      <span className="animate-bounce ml-1">&#8226;</span>
      <span className="animate-bounce ml-1">&#8226;</span>
    </div>
  );
};

export default TypingIndicator;

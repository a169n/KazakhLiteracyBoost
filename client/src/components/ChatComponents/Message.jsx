import React from "react";

const Message = ({ message, type }) => {
  const containerClass = type === "user" ? "bg-yellow-400" : "bg-yellow-200";
  const textColorClass = type === "user" ? "text-black" : "text-black";

  return (
    <div
      className={`rounded-lg p-2 mb-2 max-w-md ${containerClass} ${textColorClass}`}>
      {message}
    </div>
  );
};

export default Message;

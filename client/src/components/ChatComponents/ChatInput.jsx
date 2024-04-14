import React from "react";

const ChatInput = ({ value, onChange, onKeyDown, placeholder, onClick }) => {
  return (
    <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
      <input
        className="flex-1 mr-2 py-1 px-2 rounded-md focus:outline-none"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <button
        id="send-button"
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md focus:outline-none"
        onClick={onClick}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;

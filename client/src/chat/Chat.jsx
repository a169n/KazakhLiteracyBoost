import React, { useState, useEffect, useRef } from "react";

import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  const firstRender = useRef(true); // Using useRef to check the first render

  const displayUserMessage = (message) => {
    // Add the user's message to the chat messages
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "user" },
    ]);
    // Clear the input field
    setUserInput("");
  };

  const displayChatbotMessage = (message) => {
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "chatbot" },
    ]);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }
    displayUserMessage(userInput);

    try {
      // Send the user's message to the Express server to be processed by the chatbot
      const response = await fetch(`http://localhost:3000/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      displayChatbotMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      displayChatbotMessage(`Sorry an error has occurred... (${error})`);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Send message when the user presses the enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Display welcome message on first render
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      displayChatbotMessage(
        `Hi, I'm a Chat Bot. What can I help you with today?`
      );
    }
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-2xl font-semibold mb-4 text-center">Chatbot</div>
      <ChatBody chatMessages={chatMessages} />
      <ChatInput
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        onClick={sendMessage}
      />
    </div>
  );
};

export default Chat;

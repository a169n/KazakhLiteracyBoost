import React, { useState } from "react";

const Card = ({ card }) => {
  const [revealed, setRevealed] = useState(false);

  const toggleRevealed = () => {
    setRevealed(!revealed);
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={`http://localhost:3000/${card?.image}`}
        alt="Card Image"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{card?.definition}</h3>
        <p
          className={`text-gray-600 transition-opacity duration-300 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}>
          {card?.translation}
        </p>
        <p
          className={`text-gray-600 transition-opacity duration-300 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}>
          [{card?.transcription}]
        </p>
        <button
          onClick={toggleRevealed}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full">
          ?
        </button>
      </div>
    </div>
  );
};

export default Card;

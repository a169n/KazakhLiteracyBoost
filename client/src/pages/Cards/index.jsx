import React from "react";
import { useGetAllCardsQuery } from "../../store/services/cardsApi";

const Cards = () => {
  const { data: cards, isLoading, isError } = useGetAllCardsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cards</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={`http://localhost:3000/${card.image}`}
            alt="Card Image"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{card.definition}</h3>
            <p className="text-gray-600">{card.translation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;

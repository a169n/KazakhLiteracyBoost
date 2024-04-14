import React, { useState } from "react";
import { useGetAllCardsQuery } from "../../store/services/cardsApi";
import Card from "@/pages/Card";

const Cards = () => {
  const { data: cards, isLoading, isError } = useGetAllCardsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cards</div>;

  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;

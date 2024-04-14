// Texts.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useGetAllTextsQuery } from "../../store/services/textApi";
import { HashLoader } from "react-spinners";

const Texts = () => {
  const { data: texts, isLoading, isError } = useGetAllTextsQuery();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <HashLoader size={70} color="#F8DB39" />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching texts</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {texts.map((text) => (
        <Link key={text._id} to={`/text/${text._id}`}>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">{text.title}</h2>
            <p className="text-gray-700">{text.description}</p>
            <p className="mt-4 text-sm text-gray-500">
              {text.questions.length} questions
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Texts;

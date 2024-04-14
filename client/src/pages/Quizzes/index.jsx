import { Link } from "react-router-dom";
import { useGetQuizzesQuery } from "../../store/services/quizApi";
import { HashLoader } from "react-spinners";

const Quizzes = () => {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <HashLoader size={70} color="#F8DB39" />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching quizzes</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {quizzes.map((quiz) => (
        <Link key={quiz._id} to={`/quiz/${quiz._id}`}>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-700">{quiz.description}</p>
            <p className="mt-4 text-sm text-gray-500">
              {quiz.questions.length} questions
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Quizzes;

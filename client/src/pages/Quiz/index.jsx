import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useGetQuizQuery } from "@/store/services/quizApi";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import {
  useAddPointsToUserMutation,
  useUpdateUserQuizMutation,
} from "@/store/services/usersApi";

const Quiz = () => {
  const { id } = useParams();
  const { data: quizData, isLoading } = useGetQuizQuery(id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState(
    new Array(quizData?.questions.length).fill(null)
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
    setErrorMessage(null);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex === quizData?.questions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setErrorMessage(null);
    }
  };

  const handleSelectOption = (optionIndex) => {
    const updatedSelections = [...selectedOptionIndices];
    updatedSelections[currentQuestionIndex] = optionIndex;
    setSelectedOptionIndices(updatedSelections);
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];
    if (selectedOption.isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    setErrorMessage(null);
  };

  const user = useUser();
  const [saveQuiz] = useUpdateUserQuizMutation();

  const handleSubmitAnswer = async () => {
    const allQuestionsAnswered = selectedOptionIndices.every(
      (index) => index !== null && index !== undefined
    );
    if (!allQuestionsAnswered) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }

    const answers = selectedOptionIndices.map(
      (index) =>
        quizData.questions[currentQuestionIndex].options[index].optionText
    );

    try {
      await saveQuiz({
        token: user?.token,
        quizId: id,
        score: correctAnswersCount,
      });

      setQuizCompleted(true);
    } catch (error) {
      console.error("Error updating user quiz:", error);
    }
  };

  const [addPointsToUser] = useAddPointsToUserMutation();

  useEffect(() => {
    const updatePoints = async () => {
      if (quizCompleted) {
        try {
          const response = await addPointsToUser({
            token: user?.token,
            points: correctAnswersCount * 10,
          });

          if (response.error) {
            console.error("Error updating user points:", response.error);
            return;
          }

          toast.success(`You earned ${correctAnswersCount * 10} points!`, {
            toastId: "uniqueId",
          });
        } catch (error) {
          console.error("Error updating user points:", error);
        }
      }
    };

    updatePoints();
  }, [addPointsToUser, correctAnswersCount, quizCompleted]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <HashLoader size={70} color="#F8DB39" />
      </div>
    );

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const allQuestionsAnswered = selectedOptionIndices.every(
    (index) => index !== null && index !== undefined
  );

  return !quizCompleted ? (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-[30px]">Quiz</h1>
        <p className="font-semibold text-[30px]">
          {quizData?.difficulty ? quizData?.difficulty : "Easy"}
        </p>
      </div>
      <ProgressBar
        progress={
          ((currentQuestionIndex + 1) / quizData.questions.length) * 100
        }
        className="mb-9"
      />
      <div className="bg-[#F8DB39] text-center py-[57px] px-5 mb-5 rounded-[20px] text-white font-medium text-[26px]">
        {currentQuestion.questionText}
      </div>
      <div className="w-full grid grid-cols-4 gap-5 mb-[30px]">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`bg-[#FFF9D7] text-center px-[10px] py-[60px] rounded-[20px] font-medium text-[24px] leading-[36px] border-[2px] ${
              selectedOptionIndices[currentQuestionIndex] === index
                ? "border-purple-600"
                : "border-transparent"
            }`}
            onClick={() => handleSelectOption(index)}>
            {option.optionText}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-[25px]">
        {currentQuestionIndex !== 0 && (
          <p
            onClick={handlePreviousQuestion}
            className="text-[#F8DB39] font-bold cursor-pointer">
            Previous
          </p>
        )}
        <div className="flex justify-center flex-grow">
          {currentQuestionIndex === quizData?.questions.length - 1 && (
            <Button
              onClick={handleSubmitAnswer}
              className={`bg-[#F8DB39] text-white font-bold capitalize px-[50px] py-3 rounded-[16px] ${
                allQuestionsAnswered ? "" : "hidden"
              }`}>
              {quizCompleted ? "Completed" : "Submit"}
            </Button>
          )}
        </div>
        {currentQuestionIndex !== quizData.questions.length - 1 && (
          <p
            onClick={handleNextQuestion}
            className="text-[#F8DB39] font-bold cursor-pointer">
            Next
          </p>
        )}
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  ) : (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-semibold text-4xl mb-8">Quiz Result</h1>
      <div className="bg-[#F8DB39] text-center py-8 px-10 mb-8 rounded-lg text-white font-medium text-2xl">
        <p className="mb-4">Title: Quiz</p>
        <p className="text-[#4CAF50]">
          Total Correct Answers: {correctAnswersCount} out of{" "}
          {quizData.questions.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;

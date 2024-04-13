import { useState } from 'react';
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

const Quiz = () => {

    const mockQuizData = [
        {
            question: "Қазақша тілдің көпшілікші екінші есімін анықтаңыз:",
            answers: ["шаңырақша", "сүйікті", "сабақ", "діңгіреген"],
            correctAnswerIndex: 0
        },
        {
            question: "Ағылшынша қосымшаға құстық есім кірістіріледі:",
            answers: ["а", "an", "the", "that"],
            correctAnswerIndex: 1
        },
        {
            question: "Қазақша тілдің алғашқы есімін анықтаңыз:",
            answers: ["ақ", "бай", "қол", "тұз"],
            correctAnswerIndex: 0
        },
        {
            question: "Ағылшынша қосымшаға құстық есім кірістіріледі:",
            answers: ["a", "an", "the", "some"],
            correctAnswerIndex: 1
        },
        {
            question: "Қазақша тілдің қосымшағына салыстырмалы есімді анықтаңыз:",
            answers: ["сөйлеу", "өндіру", "дәріп", "жүйе"],
            correctAnswerIndex: 2
        },
        {
            question: "Ағылшынша қосымшаға құстық есім кірістіріледі:",
            answers: ["a", "an", "the", "that"],
            correctAnswerIndex: 0
        },
        {
            question: "Қазақша тілдің алғашқы есімін анықтаңыз:",
            answers: ["күміс", "қол", "тұз", "ақ"],
            correctAnswerIndex: 3
        },
        {
            question: "Ағылшынша қосымшаға құстық есім кірістіріледі:",
            answers: ["a", "an", "the", "that"],
            correctAnswerIndex: 1
        },
        {
            question: "Қазақша тілдің көпшілікші екінші есімін анықтаңыз:",
            answers: ["шаңырақша", "бұтақша", "мінерша", "сүйікті"],
            correctAnswerIndex: 3
        },
        {
            question: "Ағылшынша қосымшаға құстық есім кірістіріледі:",
            answers: ["a", "an", "the", "that"],
            correctAnswerIndex: 2
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1)); // Ensure index doesn't go below 0
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => Math.min(mockQuizData.length - 1, prevIndex + 1)); // Ensure index doesn't exceed array length
    };

    const handleSubmitAnswer = () => {
    };

    const currentQuestion = mockQuizData[currentQuestionIndex];

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-semibold text-[30px]">Quiz</h1>
                <p className="font-semibold text-[30px]">Easy</p>
            </div>
            <ProgressBar progress={(currentQuestionIndex + 1) / mockQuizData.length * 100} className="mb-9" />
            <div className="bg-[#F8DB39] text-center py-[57px] px-5 mb-5 rounded-[20px] text-white font-medium text-[26px]">
                {currentQuestion.question}
            </div>
            <div className="w-full grid grid-cols-4 gap-5 mb-[30px]">
                {currentQuestion.answers.map((answer, index) => (
                    <div key={index} className="bg-[#FFF9D7] text-center px-[10px] py-[60px] rounded-[20px] font-medium text-[24px] leading-[36px]">
                        {answer}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center px-[25px]">
                <p onClick={handlePreviousQuestion} className="text-[#F8DB39] font-bold">Previous</p>
                <Button onClick={handleSubmitAnswer} className="bg-[#F8DB39] text-white font-bold capitalize px-[50px] py-3 rounded-[16px]">Submit</Button>
                <p onClick={handleNextQuestion} className="text-[#F8DB39] font-bold">Next</p>
            </div>
        </div>
    );
}

export default Quiz;

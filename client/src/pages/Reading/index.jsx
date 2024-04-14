import { useState } from 'react';
import { useGetAnswerMutation } from '@/store/services/readingApi';

const Reading = () => {
  const [text, setText] = useState('');
  const [revealedAnswer, setRevealedAnswer] = useState('');
  const [mutate, { isLoading }] = useGetAnswerMutation();

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleRevealAnswer = async () => {
    try {
      const res = await mutate(text);
      setRevealedAnswer(res.data[0].generated_text);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <textarea
        className="border border-gray-300 rounded-lg p-2 px-2 mb-4 resize-none w-[600px] md:w-auto"
        value={text}
        onChange={handleInputChange}
        placeholder='Абай ақын туралы 4 томдық "Абай жолы" романы жазылған. Бұл романның авторы Мұхтар Әуезов. Бұл кітаптарда бала Абайдың тұлға, әрі болашақ ақын болып қалыптасқанға дейінгі уақыттар кезеңдермен жазылған. «Абай жолы» романын жазған кім?'
        rows={10}
        cols={50}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleRevealAnswer}
      >
        {isLoading ? 'Loading...' : 'Reveal answer'}
      </button>
      {revealedAnswer && (
        <p className="mt-4 capitalize">Answer: {revealedAnswer}</p>
      )}
    </div>

  );
};

export default Reading;

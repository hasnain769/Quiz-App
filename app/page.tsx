"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]); // Explicitly set type to any[]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setscore] = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
        const result = await response.json();
        setQuestions(result.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const handleNextClick = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);

  return (
    <main className="flex bg-zinc-500 min-h-screen flex-col items-center justify-center pt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-white">
        Online Quiz General Knowledge
      </h2>
      <div className='bg-zinc-700 flex-col h-[600px] w-[500px] text-green-500 px-4 flex-wrap'>
        {currentQuestionIndex < questions.length ? (
          <div className="flex flex-col  justify-between  items-center">
            <p className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">Q{currentQuestionIndex + 1}</p>
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">{currentQuestion.question}</h1>
            <button className='bg-zinc-800 text-2xl px-6  hover:bg-zinc-600 active:bg-zinc-800 focus:outline-none mt-16 w-[400px] py-2 first-letter: focus:ring focus:bg-zinc-300' onClick={() => setscore(score+1)}>{currentQuestion.correct_answer}</button>
            <button className='bg-zinc-800 text-2xl px-6  hover:bg-zinc-600 active:bg-zinc-800 focus:outline-none focus:ring mt-3 w-[400px] py-2 focus:bg-zinc-300'>{currentQuestion.incorrect_answers[0]}</button>
            <button className='bg-zinc-800 text-2xl px-6  hover:bg-zinc-600 active:bg-zinc-800 focus:outline-none focus:ring mt-3 w-[400px] py-2  focus:bg-zinc-300'>{currentQuestion.incorrect_answers[2]}</button>
            <button onClick={handleNextClick} className='bg-zinc-500 mt-32 w-[400px] text-3xl'>Next</button>
          </div>
        ) : (
          <div className="scroll-m-20 border-b pb-2 text-3xl  font-semibold tracking-tight transition-colors first:mt-0 text-green-600 ">
            <h1 className='mt-64'>Quiz completed! Your score: {score}</h1>
          </div>
        )}
      </div>
    </main>
  );
}

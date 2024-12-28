"use client"
import React from "react"
import { useNavigate } from 'react-router-dom'
import * as wanakana from 'wanakana'

interface DrillProps {
  questions: string[];
  type: string;
  answerData: { [key: string]: any };
}

export function Drill({ questions, type, answerData }: DrillProps) {
  const [answer, setAnswer] = React.useState('')
  const [currentQuestion, setCurrentQuestion] = React.useState(questions[Math.floor(Math.random() * questions.length)] || "")
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState(false)
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = React.useState(false)
  const [nextQuestion, setNextQuestion] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const navigate = useNavigate()

  const correctAnswer = type === "KANJI" 
    ? wanakana.toHiragana(answerData[currentQuestion].meaning.Primary)
    : type === "VOCAB" 
    ? wanakana.toHiragana(answerData[currentQuestion].reading.reading)
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hiragana = wanakana.toHiragana(e.target.value)
    setAnswer(hiragana)
  }

  const checkAnswer = () => { 
    if (answer.trim() === '') {
        alert('Please write an answer')
    } else if (answer === correctAnswer) {
        setIsCorrect(true)
        setIsAnswerSubmitted(true)
        setNextQuestion(true)
        setProgress(prev => prev + 1)
    } else {
        setNextQuestion(false)
        setIsCorrect(false)
        setIsAnswerSubmitted(true)
        setProgress(prev => prev + 1)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      if (isAnswerSubmitted) {
        if (progress === questions.length) {
          navigate('/')
        } else {
          setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)] || "")
          setAnswer('')
          setIsAnswerSubmitted(false)
          setIsCorrect(null)
          setShowExplanation(false)
        }
      } else {
        checkAnswer()
      }
    }
  }

  const handleExplainClick = () => {
    setShowExplanation(true)
    setNextQuestion(true)
  }
  
  const handleNextQuestion = () => {
    if (progress === questions.length) {
      navigate('/')
    } else {
      setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)] || "")
      setAnswer('')
      setIsAnswerSubmitted(false)
      setIsCorrect(null)
      setShowExplanation(false)
    }
  }

  return (
    <div>
        <div className="w-full h-2 bg-gray-200">
            <div className="h-full bg-blue-500" style={{ width: `${(progress / questions.length) * 100}%` }}></div>
        </div>
        <div className="w-full py-20 p-4 bg-blue-500 text-white text-center">
            <h3 className="text-4xl font-semibold">Write the meaning.</h3>
            <p lang="ja" className="text-4xl mt-2">{currentQuestion}</p>
        </div>
        <div className="mt-2 mx-4 ">
            <input
                type="text"
                className={`text-3xl shadow-md p-2 text-black text-center w-full border-5 focus:outline-none ${isCorrect === true ? 'bg-green-200' : ''}`} 
                value={answer}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="答え"
            />                
        </div>
        {isAnswerSubmitted && isCorrect === false &&(
            <section>
                <p className="text-red-500 text-center mt-4">Incorrect! The correct answer is {correctAnswer}</p>
                {!nextQuestion && (
                  <div className="m-2 mt-0 flex flex-col items-center">
                    <button onClick={handleExplainClick} className="mt-2 p-2 bg-blue-400 text-white hover:bg-blue-500 hover:border-1 ">Explain</button>
                  </div>
                )}
                {showExplanation && (
                    <div className="mt-4 text-left p-4">
                        {type === "KANJI" ? (
                            <>

                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-serif">Reading</h3>
                                <hr/>
                                <p className="mt-1 tracking-widest">{answerData[currentQuestion].reading.reading}</p>
                                <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].reading.explanation}</p>
                                <h3 className="text-2xl font-serif">Meaning</h3>
                                <hr/>
                                <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].meaning.explanation}</p>
                            </>
                        )}
                    </div>
                )}
                {nextQuestion && (
                  <div className="m-2 mt-0 flex flex-col items-center">
                    <button onClick={handleNextQuestion} className="mt-2 p-2 bg-blue-400 text-white hover:bg-blue-500 hover:border-1">{progress === questions.length ? "Finish" : "Next One"}</button>
                  </div>
                )}
            </section>
        )}
    </div>
  )
}
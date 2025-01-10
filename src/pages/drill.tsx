"use client"
import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import * as wanakana from 'wanakana'
import ExplanationVocab from "../components/exVocab"
import ExplanationKanji from "../components/exKanji"
import ExplanationRadical from "../components/exRadical"

interface DrillProps {
  questions: string[];
  type: string;
  answerData: { [key: string]: any };
}

export function Drill({ questions, type, answerData }: DrillProps) {
  const [usedQuestions, setUsedQuestions] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const firstQuestion = questions[Math.floor(Math.random() * questions.length)]
    setUsedQuestions([firstQuestion])
    // For RADICAL type, we want to show the character as the question
    return type === "RADICAL" ? answerData[firstQuestion].character : firstQuestion
  })
  const [answer, setAnswer] = useState('')
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [nextQuestion, setNextQuestion] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{ question: string, correct: boolean }[]>([])
  const navigate = useNavigate()
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const correctAnswer = type === "KANJI" 
    ? wanakana.toHiragana(answerData[currentQuestion].reading.onyomi.meaning)
    : type === "VOCAB" 
    ? wanakana.toHiragana(answerData[currentQuestion].reading.reading)
    : type === "RADICAL" 
    ? questions.find(q => answerData[q].character === currentQuestion)?.toLowerCase() // Find the key that matches the character
    : "";

  useEffect(() => {
    if (inputRef.current) {
      const handleAnimationEnd = () => setShake(false)
      const inputElement = inputRef.current
      inputElement.addEventListener('animationend', handleAnimationEnd)
      return () => inputElement.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type === "RADICAL" 
    ? setAnswer(e.target.value)
    : setAnswer(e.target.value[e.target.value.length - 1] === 'n' || e.target.value[e.target.value.length - 1] === 'y'
      ? e.target.value[e.target.value.length - 1] === 'n' && e.target.value[e.target.value.length - 2] === 'n'
      ? e.target.value.slice(0, e.target.value.length - 2) + wanakana.toHiragana('n') 
      : e.target.value
      : wanakana.toHiragana(e.target.value))
    setShake(false); // Remove shake class when user starts typing
  }

  const checkAnswer = () => { 
    if (answer.trim() === '') {
        setShake(true); // Trigger shake animation
    } else if (correctAnswer?.includes(answer.trim())) {
        setIsCorrect(true)
        setIsAnswerSubmitted(true)
        setNextQuestion(true)
        setProgress(prev => prev + 1)
        setResults(prev => [...prev, { question: currentQuestion, correct: true }])
    } else {
        setNextQuestion(false)
        setIsCorrect(false)
        setIsAnswerSubmitted(true)
        setProgress(prev => prev + 1)
        setResults(prev => [...prev, { question: currentQuestion, correct: false }])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      if (isAnswerSubmitted) {
        if (progress === questions.length) {
          setShowExplanation(false)
        } else {
          const nextQ = getNextQuestion()
          setUsedQuestions(prev => [...prev, nextQ])
          setCurrentQuestion(type === "RADICAL" ? answerData[nextQ].character : nextQ)
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
  
  const getNextQuestion = (): string => {
    const availableQuestions = questions.filter(q => !usedQuestions.includes(q))
    
    if (availableQuestions.length === 0) {
      // All questions have been used, reset
      setUsedQuestions([])
      return questions[Math.floor(Math.random() * questions.length)]
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  }

  const handleNextQuestion = () => {
    if (progress === questions.length) {
      setShowExplanation(false)
    } else {
      const nextQ = getNextQuestion()
      setUsedQuestions(prev => [...prev, nextQ])
      setCurrentQuestion(type === "RADICAL" ? answerData[nextQ].character : nextQ)
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
        {progress === questions.length ? (
          <div className="w-full py-20 p-4 bg-blue-500 text-white text-center">
            <h3 className="text-4xl font-semibold">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg shadow-sm ${result.correct ? 'bg-green-200' : 'bg-red-200'}`}
                >
                  <p className="text-center font-bold text-lg">{result.question}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/')} className="mt-4 p-2 bg-blue-400 text-white hover:bg-blue-500 hover:border-1">Go Home</button>
          </div>
        ) : (
          <>
            <div className="w-full py-20 p-4 bg-blue-500 text-white text-center">
                <h3 className="text-4xl font-semibold">Write the meaning.</h3>
                <p lang="ja" className="text-4xl mt-2">{currentQuestion}</p>
            </div>
            <div className="mt-2 mx-4 ">
                <input
                    ref={inputRef}
                    type="text"
                    className={`text-3xl shadow-md h-fit p-2 box-sizing:box-border text-black text-center w-full border-5 focus:outline-none ${isCorrect === true ? 'bg-green-200' : ''} ${shake ? 'shake' : ''}`} 
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
                              <ExplanationKanji answerData={answerData} currentQuestion={currentQuestion}/>
                            ) : type === 'VOCAB' ? (
                              <ExplanationVocab answerData={answerData} currentQuestion={currentQuestion}/>
                            ): type === 'RADICAL' ? (
                              <ExplanationRadical answerData={answerData} currentQuestion={correctAnswer || ''}/> 
                            ) : null}
                        </div>
                    )}
                    {nextQuestion && (
                      <div className="m-2 mt-0 flex flex-col items-center">
                        <button onClick={handleNextQuestion} className="mt-2 p-2 bg-blue-400 text-white hover:bg-blue-500 hover:border-1">{progress === questions.length ? "Finish" : "Next One"}</button>
                      </div>
                    )}
                </section>
            )}
          </>
        )}
    </div>
  )
}
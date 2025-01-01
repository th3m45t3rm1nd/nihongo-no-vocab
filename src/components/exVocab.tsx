import { VocabData } from "../types/typesVocabulary";
interface Props {
    answerData: VocabData;
    currentQuestion: string;
}

export default function ExplanationVocab({answerData, currentQuestion} : Props)  {
    console.log(answerData[currentQuestion])
    return (
        <>
            <h3 className="text-2xl font-serif">Reading</h3>
            <hr/>
            <p className="mt-1 tracking-widest">{answerData[currentQuestion].reading.reading}</p>
            <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].reading.explanation}</p>
            <h3 className="text-2xl font-serif">Meaning</h3>
            <hr/>
            <p className="mt-1 "><strong>Primary:</strong> {answerData[currentQuestion].meaning.Primary}</p>
            <p className="mt-1 "><strong>Word Type:</strong> {answerData[currentQuestion].meaning["Word Type"]}</p>
            <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].meaning.explanation}</p>
        </>
    )
}

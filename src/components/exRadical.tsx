import { RadicalData } from "../types/typesRadicals";
interface Props {
    answerData: RadicalData;
    currentQuestion: string;
}   
export default function ExplanationRadical({answerData, currentQuestion} :  Props) {
    return (
        <>
            <h3 className="text-2xl font-serif">Meaning</h3>
            <hr/>
            <p className="mt-1 bg-gray-300 p-4">{currentQuestion}</p>
            <p>{answerData[currentQuestion].id}</p>
        </>
    )
}
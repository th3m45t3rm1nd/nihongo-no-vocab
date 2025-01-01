import { KanjiData } from "../types/typesKanjis";

interface Props {
    answerData: KanjiData;
    currentQuestion: string;
}

export default function ExplanationKanji({answerData, currentQuestion}: Props) {                            
    return (
        <>
            <h3 className="text-2xl font-serif">Radical Combination</h3>
            <hr/>
            {Object.keys(answerData[currentQuestion].radicalCombination).map((key) => <p className="mt-1">{key} {answerData[currentQuestion].radicalCombination[key]}</p>)}
            <h3 className="mt-1 text-2xl font-serif">Meaning</h3>
            <hr/>

        </>
    );
}
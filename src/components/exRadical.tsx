import { RadicalData } from "../types/typesRadicals";
interface Props {
    answerData: RadicalData;
    currentQuestion: string;
}   
export default function ExplanationRadical({answerData, currentQuestion} :  Props) {
    console.log(currentQuestion);   
    return (
        <>
            <h3 className="text-2xl font-serif">Meaning</h3>
            <hr/>
            <p className=""><strong>Meaning</strong>: {`${currentQuestion[0].toUpperCase()+currentQuestion.substring(1)}`}</p>
            <p><strong>Mnemonic</strong>: {answerData[`${currentQuestion[0].toUpperCase()+currentQuestion.substring(1)}`].mnemonic}</p>
            <h3 className="mt-1 text-2xl font-serif">Found in Kanji</h3>
            <hr/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {Object.keys(answerData[`${currentQuestion[0].toUpperCase()+currentQuestion.substring(1)}`].foundInKanji).map((kanji) => (
                    <div 
                        key={kanji}
                        className="p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <p key={`${kanji}-meaning`} className="text-center"><strong>{kanji}</strong></p>
                        <p key={`${kanji}-reading`} className="text-center">{answerData[`${currentQuestion[0].toUpperCase()+currentQuestion.substring(1)}`].foundInKanji[kanji].meaning}</p>
                        <p key={`${kanji}-vocab`} className="text-center">{answerData[`${currentQuestion[0].toUpperCase()+currentQuestion.substring(1)}`].foundInKanji[kanji].reading}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
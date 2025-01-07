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
            {Object.keys(answerData[currentQuestion].radicalCombination).map((key) => (
                <p key={key} className="mt-1">
                    {key} {answerData[currentQuestion].radicalCombination[key]}
                </p>
            ))}
            <h3 className="mt-1 text-2xl font-serif">Reading</h3>
            <hr/>
            <p className={`${answerData[currentQuestion].reading.onyomi.primary ? 'text-black' : 'text-gray-300'}`}><strong>On'yomi</strong>: {answerData[currentQuestion].reading.onyomi.meaning}</p>
            <p className={`${answerData[currentQuestion].reading.kunyomi.primary ? 'text-black' : 'text-gray-300'}`}><strong>Kun'yomi</strong>: {answerData[currentQuestion].reading.kunyomi.meaning}</p>
            <p className={`${answerData[currentQuestion].reading.nanori.primary ? 'text-black' : 'text-gray-300'}`}><strong>Nanori</strong>: {answerData[currentQuestion].reading.nanori.meaning}</p>
            <p><strong>Mnemonic</strong>: {answerData[currentQuestion].reading.mnemonc}</p>
            <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].reading.hint}</p>
            <h3 className="mt-1 text-2xl font-serif">Meaning</h3>
            <hr/>
            <p className=""><strong>Primary</strong>: {answerData[currentQuestion].meaning.Primary}</p>
            <p className=""><strong>Alternatives</strong>: {answerData[currentQuestion].meaning.alt}</p>
            <p><strong>Mnemonic</strong>: {answerData[currentQuestion].meaning.mnemonc}</p>
            <p className="mt-1 bg-gray-300 p-4">{answerData[currentQuestion].meaning.hint}</p>
            <h3 className="mt-1 text-2xl font-serif">Found in Kanji</h3>
            <hr/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {Object.keys(answerData[currentQuestion].foundInVocab).map((kanji) => (
                    <div 
                        key={kanji}
                        className="p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <p key={`${kanji}-meaning`} className="text-center"><strong>{kanji}</strong></p>
                        <p key={`${kanji}-reading`} className="text-center">{answerData[currentQuestion].foundInVocab[kanji].meaning}</p>
                        <p key={`${kanji}-vocab`} className="text-center">{answerData[currentQuestion].foundInVocab[kanji].reading}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
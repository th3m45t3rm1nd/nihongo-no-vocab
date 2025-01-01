import { useState } from "react"
import vocabData from '../../data/u-vocabulary.json'
import {VocabData} from '../types/typesVocabulary'  
import { Drill } from "./drill";

export default function Vocabs() {
    const vdata = vocabData as VocabData
    const [_, setSelectedLevel] = useState<number | null>(null);
    const [vocabArray, setVocabArray] = useState<string[]>([]);
    const [showDrill, setShowDrill] = useState<boolean>(false);

    const handleButtonClick = (level: number) => {
        setSelectedLevel(level);
        const filteredVocab = Object.entries(vdata)
            .filter(([_, value]) => value.level === `level-${level}`)
            .map(([vocab, _]) => vocab);
        setVocabArray(filteredVocab);
        console.log(vdata)
        setShowDrill(true);
    };

    return (
        <div>
            {showDrill ? (
                <Drill questions={vocabArray} type="VOCAB" answerData={vdata}/>
            ) : (
                <>
                    <h1 className="text-4xl text-center">Vocabulary</h1>
                    <div className="grid grid-cols-10 gap-4 mx-4 justify-center pt-10">
                        {Array.from({ length: 60 }, (_, i) => (
                            <button 
                                key={i + 1} 
                                onClick={() => handleButtonClick(i + 1)} 
                                className="p-2 border rounded hover:bg-blue-500 hover:text-white"
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
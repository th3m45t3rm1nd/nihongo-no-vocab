import { useState } from "react"
import kanjiData from '../../data/u-kanjis.json'
import {KanjiData} from '../types'  
import { Drill } from "./drill";

export default function Kanjis() {
    const kdata = kanjiData as KanjiData
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [kanjiArray, setKanjiArray] = useState<string[]>([]);
    const [showDrill, setShowDrill] = useState<boolean>(false);

    const handleButtonClick = (level: number) => {
        setSelectedLevel(level);
        const filteredKanji = Object.entries(kdata)
            .filter(([_, value]) => value.level === `level-${level}`)
            .map(([kanji, _]) => kanji);
        setKanjiArray(filteredKanji);
        setShowDrill(true);
    };

    return (
        <div>
            {showDrill ? (
                <Drill questions={kanjiArray} type="KANJI" answerData={kdata}/>
            ) : (
                <>
                    <h1 className="text-4xl text-center">Kanji</h1>
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
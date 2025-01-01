import { useState } from "react"
import radicalData from '../../data/u-radicals.json'
import {RadicalData} from '../types/typesRadicals'  
import { Drill } from "./drill";

export default function Radicals() {
    const rdata = radicalData as RadicalData
    const [_, setSelectedLevel] = useState<number | null>(null);
    const [radicalArray, setRadicalArray] = useState<string[]>([]);
    const [showDrill, setShowDrill] = useState<boolean>(false);

    const handleButtonClick = (level: number) => {
        setSelectedLevel(level);
        const filteredRadicals = Object.entries(rdata)
            .filter(([_, value]) => value.level === `level-${level}\n`)
            .map(([radical, _]) => radical);
        setRadicalArray(filteredRadicals);
        setShowDrill(true);
    };

    return (
        <div>
            {showDrill ? (
                <Drill questions={radicalArray} type="RADICAL" answerData={rdata}/>
            ) : (
                <>
                    <h1 className="text-4xl text-center">Radicals</h1>
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
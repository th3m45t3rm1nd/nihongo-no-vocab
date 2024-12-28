import { useNavigate } from "react-router-dom"
export default function Home() {
    const navigate = useNavigate()

    const handleClick = (page: String) => {
        navigate(`/${page}`)
    }
    return (
        <div>
            <h1 className="my-2 text-3xl text-center font-serif">
                nihongo no vocab
            </h1>
            <hr />
            <p className="my-2 text-2xl text-center">
                What are we learning today?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center max-w-2xl mx-auto my-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleClick('radicals')}
                >Radicals</button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleClick('kanjis')}
                >Kanji</button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleClick('vocabs')}
                >Vocabulary</button>
            </div>
        </div>
    )
}
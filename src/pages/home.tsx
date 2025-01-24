import { useNavigate } from "react-router-dom"
export default function Home() {
    const navigate = useNavigate()

    const handleClick = (page: String) => {
        navigate(`/${page}`)
    }
    return (
        <div>
            <div className="grid grid-row-10 place-items-center h-screen">
                <h1 className="row-span-1 my-2 text-3xl text-center font-serif">
                    nihongo no vocab
                </h1>
                <p className="row-span-2 my-2 text-2xl">
                    What are we learning today?
                </p>
                <div className="row-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center max-w-2xl mx-auto my-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium font-serif rounded py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg lg:text-xl"
                        onClick={() => handleClick('radicals')}
                    >Radicals</button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium font-serif rounded py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg lg:text-xl"
                        onClick={() => handleClick('kanjis')}
                    >Kanji</button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium font-serif rounded py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg lg:text-xl"
                        onClick={() => handleClick('vocabs')}
                    >Vocabulary</button>
                </div>
                <footer className="row-span-1">Made with 💙 for learning Japanse</footer>
            </div>
        </div>
    )
}

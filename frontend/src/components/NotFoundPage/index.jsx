import { Link } from "react-router-dom"

export default function NotFoundPage() {

    return (
        <div className="mx-auto h-[100vh] w-[80vw] justify-center items-center rounded-md pt-10">
            <div>
                <main className="flex h-[49vh] w-full flex-col justify-center items-center bg-black rounded-md">

                    <div className="">
                        <p className="text-xl text-center">Oops! We can't find that page.</p>
                    </div>
                    <div>
                        <Link to="/">
                            <button type="button" className="block mx-auto border-none p-1 mt-4 mb-8 rounded bg-emerald-400 hover:bg-yellow-500">
                                Return Home
                            </button>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}
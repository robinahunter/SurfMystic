//Cite border gradient: https://www.dhairyashah.dev/posts/how-to-create-gradient-border-with-tailwind-css/
import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <div className="mx-auto h-[50vh] w-[50vw] justify-center items-center rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
            <div>
                <main className="flex h-[49vh] w-full flex-col justify-center items-center bg-black rounded-md">
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">
                        404
                    </h1>
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 px-5 text-lg rounded rotate-12 absolute">
                        Page Not Found
                    </div>
                    <Link to="/"><button className="mt-5">
                        <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">

                            <span className="text-white items-center p-4 px-3 rounded bg-gradient-to-r from-pink-500 hover:to-yellow-500 hover:from-green-400 to-blue-500">
                                Return Home
                            </span>
                        </span>
                    </button>
                    </Link>
                </main>
            </div>
            <br /><br />
        </div>
    )
}
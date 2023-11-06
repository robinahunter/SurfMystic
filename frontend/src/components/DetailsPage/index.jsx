import { Link, useParams } from "react-router-dom"; 

export default function DetailsPage(props) {

    return (
        <div className="mx-auto w-[75vw]">
            <div className="p-4">
                <div className="group">
                    <h1 className="mb-4 text-center text-white text-4xl">
                        
                    </h1>
                </div>
                <br />
                <div className="mt-4 text-center text-white">
                    <div className="text-left ml-10 mr-10 text-white p-2 text-xl"> Google Maps:
                        
                    </div>
                </div>
                <div>
                    <div className="mt-4 text-center">
                        <button type="button" className="border-none mx-auto items-left p-1 px-4 rounded bg-emerald-400 hover:bg-yellow-500">
                            <Link className="mx-auto text-white" to="/">HOME</Link>
                        </button>  
                    </div>      
                </div>
            </div>
        </div>
    );
}
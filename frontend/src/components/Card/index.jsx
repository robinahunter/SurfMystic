import { Link } from "react-router-dom"

export default function Card({ arrayData, updateDetails }) {

    // let city = <p>No City, State data available</p>
    // if (typeof arrayData.cityState === "object") {
    //     city = Object.values(arrayData.object.properties.relativeLocation.properties.city).map((cityState, index) => (
    //     <span key={index}>{cityState}, </span>
    //     ))
    // }
    // let currencies = <p>No language data data available</p>
    // //Must access the object to get currency codes as keys
    // if (arrayData.currencies) {
    //     currencies = Object.entries(arrayData.currencies).map(([propertiesCity, propertiesState], index) => (
    //         <div key={index}>
    //             <p>{currencyData.symbol} : {currencyData.name}</p>
    //         </div>
    //     ))
    // }
    let CardContent = <p className='text-white'>Your weather is loading...</p>

    return (
    <div className="grid gap-0 items-start justify-center">
        <div className="relative">
            <div className="rounded-s"></div>
            <Link to="/details" onClick={() => { updateDetails(arrayData) }}>
                <figure className="w-[30vw] h-full relative cursor-pointer hover:transform hover:scale-105 transition ease duration-500">
                    <div className="w-full aspect-w-4 aspect-h-5">
                        <div>
                            {/* Check if nested properties exist before accessing them */}
                            {arrayData?.object?.properties?.relativeLocation?.properties?.city && (
                            <h2 className="bottom-6 left-0 right-0 text-white font-bold z-10 text-left">
                                {arrayData.object.properties.relativeLocation.properties.city}
                            </h2>
                            )}
                        </div>
                    </div>      
                </figure>
            </Link>
        </div>
    </div>
  )
  }

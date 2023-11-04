import { Link } from "react-router-dom"; 

export default function DetailsPage(props) {
    
    // const nameCommon = props.name && props.name.common;
    // const flags = props.flags.svg;

    // let languages = <p>No language data data available</p>
    // if (typeof props.languages === "object") {
    //     languages = Object.values(props.languages).map((language, index) => (
    //     <span className="font-bold text-1xl" key={index}>{language}, </span>
    //     ))
    // }
    // let currency = <p>No language data data available</p>
    // //Must access the object to get currency codes as keys
    // if (props.currencies) {
    //     currency = Object.entries(props.currencies).map(([currencyCode, currencyData], index) => (
    //         <div key={index}>
    //             <p className="font-bold text-1xl">{currencyData.symbol} : {currencyData.name}</p>
    //         </div>
    //     ))
    // }


    return (
        <div className="mx-auto w-[75vw]">
            <div className="p-4">
                <div className="group">
                        <h1 className="mb-4 text-center text-white text-4xl">
                            {props.object.properties.relativeLocation.properties.city}
                        </h1>
                </div>
                    <br />
                    <div className="mt-4 text-center text-white">

                        <div className="text-left ml-10 mr-10 text-white p-2 text-xl"> Google Maps:
                        {/* <iframe
                            src={`https://maps.google.com/maps?q=${props.object.properties.relativeLocation.properties.city}&${props.object.properties.relativeLocation.properties.state}&z=5&output=embed`}
                            width="450"
                            height="300"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps">
                        </iframe> */}
                        </div>
                    </div>
                    <div >
                        <div className="mt-4 text-center">
                            <button type="button" className="border-none mx-auto items-left p-1 px-4 rounded bg-emerald-400 hover:bg-yellow-500">
                                <Link className="mx-auto text-white" to="/">HOME</Link>
                            </button>  
                        </div>      
                    </div>
                </div>
            <div>
        </div>
    </div>
    )
}
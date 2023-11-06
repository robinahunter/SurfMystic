import { Link } from "react-router-dom";

export default function Card({ arrayApiData, updateDetails }) {

    // let city = "No City data available";
    // if (arrayApiData?.properties?.relativeLocation?.properties?.city) {
    //   city = arrayApiData.properties.relativeLocation.properties.city
    // }

    const cityName = arrayApiData.city.name || "No City data available"
    console.log("City Name:", cityName);
  return (
    <div className="grid gap-0 items-start justify-center">
      <div className="relative">
        <div className="rounded-s"></div>
        <Link to="/details" onClick={() => { updateDetails(arrayApiData) }}>
          <figure className="w-[30vw] h-full relative cursor-pointer hover:transform hover:scale-105 transition ease duration-500">
            <div className="w-full aspect-w-4 aspect-h-5">
              <div>
                <h1>Weather Information</h1>
                <p>City: {city}</p>
              </div>
            </div>
          </figure>
        </Link>
      </div>
    </div>
  );
}

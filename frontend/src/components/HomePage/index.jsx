import { useState, useEffect } from 'react'
import axios from 'axios'

// 20.8438, -156.6541
export default function HomePage() {

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [locationData, setLocationData] = useState({})
    const [forecastData, setForecastData] = useState(null)
    const [address, setAddress] = useState('')
    const api_key = import.meta.env.VITE_APP_API_KEY

    //function to find closest degree value in the degreeToCardinal object based on a given degree for wind direction. 
    function windDir(degrees) {
        const degreeToCardinal = {
          22: "N",
          22.5: "N-NE",
          45: "NE",
          67.5: "E-NE",
          90: "E",
          112.5: "E-SE",
          135: "SE",
          157.5: "S-SE",
          180: "S",
          202.5: "S-SW",
          225: "SW",
          247.5: "W-SW",
          270: "W",
          292.5: "W-NW",
          315: "NW",
          337.5: "N-NW",
        };
    //Returns corresponding wind direction text string based on the closest match
    //Using the reduce method to iterate over the windDir array and takes 2 params (2 values in the array)
    const closestMatch = Object.keys(degreeToCardinal).reduce((a, b) => {
    //Math.abs calculates the absolute difference between current 'b' and previously selected closest match 'a'
    //Stores the result in closestMatch variable
        return Math.abs(b - degrees) < Math.abs(a - degrees) ? b : a;
    });

  return degreeToCardinal[closestMatch];
}

// const fetchUserLocation = () => {
// useEffect(() => {
//     // Fetch user's location using Geolocation API JavaScript
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             setLatitude(position.coords.latitude.toFixed(4));
//             setLongitude(position.coords.longitude.toFixed(4));
//     });
//   }
// }; 
// -----------------------------------------------------------------

const fetchUserLocation = () => {
    // Function to set default location
    const setDefaultLocation = () => {
      setLatitude(DEFAULT_LATITUDE.toFixed(4));
      setLongitude(DEFAULT_LONGITUDE.toFixed(4));
    };
  
    // Default location coordinates
    const DEFAULT_LATITUDE = 20.9015; 
    const DEFAULT_LONGITUDE = -156.4821; 
  
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Attempt to get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If successful, set the user's location
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
        },
        (error) => {
          // If there's an error (e.g., user denies permission), set default location
          console.error(`Error getting location: ${error.message}`);
          setDefaultLocation();
        }
      );
    } else {
      // If geolocation is not supported, set default location
      console.error("Geolocation is not supported by this browser.");
      setDefaultLocation();
    }
  };

const headers = {
'User-Agent': '(auth, r@r-hunter.com)'
};
// -----------------------------------------------------------------
useEffect(() => {
    // Fetch user's location using Geolocation API JavaScript
    fetchUserLocation();
}, []); 

useEffect(() => {
   // Fetch weather data for Launiupoko Beach Park, HI on mount (preload data before user selects a location)
  const fetchDefaultLocation = async () => {
      const response = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`, {
        headers: headers
    });
      setLocationData(response.data);

  // Within the API follow the path locationData.properties.forecastGridData to obtain url for forecast
  const forecastGridDataUrl = response.data.properties?.forecastGridData;
  if (forecastGridDataUrl) {
      const forecastResponse = await axios.get(forecastGridDataUrl, {
        headers: headers
        });
      setForecastData(forecastResponse.data);
      console.log(forecastGridDataUrl)
    }
  } 

    // Call the function to fetch data for Honolulu on component mount
    fetchDefaultLocation();
  }, [latitude, longitude]);

    const searchAddress = async (event) => {
        if (event.key === 'Enter') {
                const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`)
                const location = googleResponse.data.results[0]?.geometry?.location;
                if (location) {
                    //Store the lat and long in variables and set the fixed decimal point to 4 max per the NWS API docs
                    setLatitude(location.lat.toFixed(4));
                    setLongitude(location.lng.toFixed(4));
                    // setAddress('');
                    console.log(latitude)
                    console.log(longitude)
                    console.log(location) 
                    console.log("Address:", address);
                      

                //Pull lat long variables into NWS Api to pull initial weather for address entered by user
                if (latitude && longitude) {
                    const nwsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`, {
                    // console.log(nwsResponse.length)
                    // nwsResponse.data to access weather information.
                    headers: headers
                    });
                    setLocationData(nwsResponse.data);
        
                    //Pull forecast url from locationData to get forecast
                    const forecastGridDataUrl = nwsResponse.data.properties?.forecastGridData;
                    if (forecastGridDataUrl) {
                    const forecastResponse = await axios.get(forecastGridDataUrl, {
                        headers: headers
                        });
                    setForecastData(forecastResponse.data);
                    console.log(forecastGridDataUrl)
                    
                    }
                }
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchAddress(e);
            setAddress('');
        }
    };
    
    return (
        <>
    {/* Title and Search Bar Function */}
        <div className="largeScreen my-0 mx-auto max-w-5xl md:flex md:justify-between md:items-center md:w-[75vw] md:h-[80vh]">
            <div className="weatherBox md:w-[50vw] md:inline-block">
                    <div className="app mx-auto">
                        <div className="mx-auto text-center">
                            <div className="search input rounded-lg justify-center inline-block">
                                <input 
                                value={address}
                                className="input bg-neutral-700 border border-neutral-200 focus:outline-pink-200 m-2 p-4 rounded-lg"
                                onChange={(event) => setAddress(event.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Location..."
                                type="text" />
                            </div>
                            <div className="locationIcon inline-block justified-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#34d399" onClick={fetchUserLocation} className="w-8 h-8 cursor-pointer hover:stroke-emerald-200">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container mx-auto justify-center">
                            <div className="top">
                                <div className="address">
                                    {/* Pull name information from first NWS API (saved to locationData) */}
                                {locationData?.properties?.relativeLocation?.properties?.city && locationData?.properties?.relativeLocation?.properties?.state ? (
                                <h1 className='text-2xl text-center'>
                                    {locationData.properties.relativeLocation.properties.city}, {locationData.properties.relativeLocation.properties.state}
                                </h1>
                                ) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pull forecast information from second NWS API (saved to forecastData)*/}       

                    <div className="bottom p-2 mx-auto justify-center">

                        <div className="temp mt-2 text-center">
                            {forecastData?.properties?.temperature?.values[0].value ? (
                            <h1 className="text-bold text-5xl text-yellow-500 ">
                                {(forecastData.properties.temperature.values[0].value * 9/5 + 32).toFixed()}°F
                            </h1>
                            ) : (
                            'No data'
                            )}
                        </div>

                        <div className="maxMinTemp mt-2 text-center">
                            {forecastData?.properties?.maxTemperature?.values[0].value && forecastData?.properties?.minTemperature?.values[0].value ? (
                            <h1 className="text-bold text-xl text-cyan-400">
                                <span className='text-pink-500'>{(forecastData.properties.maxTemperature.values[0].value * 9/5 + 32).toFixed()}°F High</span>  <span className='text-white'>/</span> {(forecastData.properties.minTemperature.values[0].value * 9/5 + 32).toFixed()}°F Low
                            </h1>
                            ) : null}
                        </div>

                        <div className="dayTime mt-2 text-center">
            
                        </div>

                        <div className="humidity mt-2 text-center">
                            {forecastData?.properties?.relativeHumidity?.values[0].value ? (
                            <h1 className="text-bold text-sm">Humidity: {forecastData.properties.relativeHumidity.values[0].value.toFixed()}%
                            </h1>
                            ) : null}
                        </div>

                        <div className="chanceOfRain mt-2 text-center">
                            {forecastData?.properties?.probabilityOfPrecipitation?.values[0].value ? (
                            <h1 className="text-bold text-sm">
                                Chance of Rain: {forecastData.properties.probabilityOfPrecipitation.values[0].value}%
                            </h1>
                            ) : null}
                        </div>
                        <div className="volumeOfRain mt-2 text-center">
                            {forecastData?.properties?.quantitativePrecipitation?.values[0].value ? (
                            <h1 className="text-bold text-sm">
                                Amount of Rain: {(forecastData.properties.quantitativePrecipitation.values[0].value * 0.0393701).toFixed(2)} inch
                            </h1>
                            ) : null}
                        </div>
                        <div className="elevation mt-2 text-center">
                            {forecastData?.properties?.elevation?.value ? (
                            <h1 className="text-bold text-sm">
                                Elevation: {(forecastData.properties.elevation.value  * 3.28084).toFixed()}'
                            </h1>
                            ) : null}
                        </div>
                        <div className="windDirection mx-auto w-[320px]">
                            <div className='flex mx-auto border rounded-lg mt-4 w-[320px]'>
                                {/* Wind data ------------ */}
                                <div className='windData text-right w-[50vw]'>
                                    <p className='mt-2 mr-4 text-pink-400'>WIND</p>
                                    <div className="windDirection mt-2 mr-4 text-right">
                                        {forecastData?.properties?.windDirection?.values[0].value ? (
                                        <p className="text-bold">
                                            Dir: {windDir(forecastData.properties.windDirection.values[0].value)} ({forecastData.properties.windDirection.values[0].value}°)
                                        </p>
                                        ) : null}
                                    </div>

                                    <div className="windSpeed mr-4 text-right">
                                        {forecastData?.properties?.windSpeed?.values[0].value ? (
                                        <p className="text-bold ">
                                            Speed: {(forecastData.properties.windSpeed.values[0].value * 0.621371192).toFixed()} MPH
                                        </p>
                                        ) : null}
                                    </div>

                                    <div className="windGust mr-4 text-right">
                                        {forecastData?.properties?.windGust?.values[0].value ? (
                                        <p className="text-bold">
                                            Gusts: {(forecastData.properties.windGust.values[0].value * 0.621371192).toFixed()} MPH
                                        </p>
                                        ) : null}
                                    </div>
                                </div>
                                {/* End wind data ---------- */}


                                {/* Wave data ---------- */}
                                <div className='waveData mx-auto w-[50vw]'>
                                <p className='mt-2 ml-4 text-emerald-400'>WAVES</p>
                                    <div className="waveHeight mt-2 ml-4 ext-left">
                                        {forecastData?.properties?.waveHeight?.values[0].value ? (
                                        <p className="text-bold">
                                            Height: {(forecastData.properties.waveHeight.values[0].value * 3.28084).toFixed()}'
                                        </p>
                                        ) : (
                                        'No Wave Data'
                                        )}
                                    </div>

                                    <div className="wavePeriod ml-4 ext-left">
                                        {forecastData?.properties?.wavePeriod?.values[0].value ? (
                                        <p className="text-bold">
                                            Period: {forecastData.properties.wavePeriod.values[0].value.toFixed()} sec
                                        </p>
                                        ) : null}
                                    </div>

                                    <div className="waveDirection ml-4 text-left">
                                        {forecastData?.properties?.waveDirection?.values[0] ? (
                                        <p className="text-bold">
                                            Wave Direction: {forecastData.properties.waveDirection.values[0].toFixed()} degrees?
                                        </p>
                                        ) : null}
                                    </div>

                                    <div className="primarySwellHeight mb-3 ml-4 text-left">
                                        {forecastData?.properties?.primarySwellHeight?.values[0].value !== undefined ? (
                                        <p className="text-bold">
                                            Swell: {(forecastData.properties.primarySwellHeight.values[0].value * 3.28084).toFixed(2)}'
                                        </p>
                                        ) : (
                                        <p>No Swell</p>
                                        )}
                                    </div>
                                </div>
                                {/* End wave data ---------- */}
                            </div>
                            {/* Favorit Toggle On/Off */}
                            <div className="buttons flex mx-auto pt-2">

                                <svg
                                    // onClick={handleSvgClick}
                                    className={`w-6 h-6 ml-auto text-pink-400 cursor-pointer object hover:fill-pink-400`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 21 19"
                                    >
                                    <path
                                        stroke="#f472b6"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                                    />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>  
                {/* Google Map  */}
                <div className="googleMap mx-auto mt-2 md:w-[50vw] md:h-[50vh] md:inline-block md:justify-center">
                    <div className="text-white w-full h-full justify-center p-5">
                        <iframe
                            className="aspect-video w-full h-full justify-center rounded-lg"
                            src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
                            width="auto"
                            height="auto"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps">
                        </iframe>
                    </div>
                </div>
                {/* End Google Map */}
            </div>       
        </>
    )
}


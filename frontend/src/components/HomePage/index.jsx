import { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteLocation from "./../FavoriteLocation"
// import { Link } from "react-router-dom";

// 20.8438, -156.6541
export default function HomePage() {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [locationData, setLocationData] = useState({})
    const [forecastData, setForecastData] = useState(null)
    const [address, setAddress] = useState('')
    console.log(address)

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

useEffect(() => {
    // Fetch user's location using Geolocation API JavaScript
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toFixed(4));
        setLongitude(position.coords.longitude.toFixed(4));
        console.log(latitude)
        console.log(longitude)
        console.log(position)
    });
    }
}, []); 

useEffect(() => {
   // Fetch weather data for Honolulu, HI on mount (preload data before user selects a location)
  const fetchDefaultLocation = async () => {
      const response = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`, {
      headers: {
        'User-Agent': 'auth, r@r-hunter.com',
      },
    });
      setLocationData(response.data);

  // Within the API follow the path locationData.properties.forecastGridData to obtain url for forecast
  const forecastGridDataUrl = response.data.properties?.forecastGridData;
  if (forecastGridDataUrl) {
      const forecastResponse = await axios.get(forecastGridDataUrl, {
        headers: {
            'User-Agent': 'auth, r@r-hunter.com',
          },
        });
      setForecastData(forecastResponse.data);
      // console.log(forecastGridDataUrl)
    }
  } 

    // Call the function to fetch data for Honolulu on component mount
    fetchDefaultLocation();
  }, [latitude, longitude]);

    const searchAddress = async (event) => {
        if (event.key === 'Enter') {
                const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDmhOqZdStgUNHSw1Nca_sW9P9Ckb_r81I`);
                // ${import.meta.env.GOOGLE_API_KEY}
                const location = googleResponse.data.results[0]?.geometry?.location;
                if (location) {
                    //Store the lat and long in variables and set the fixed decimal point to 4 max per the NWS API docs
                    setLatitude(location.lat.toFixed(4));
                    setLongitude(location.lng.toFixed(4));
                    // setAddress('');
                    console.log(latitude)
                    console.log(longitude)
                    console.log(location) 
                    console.log("Address:"(address))
                      

                //Pull lat long variables into NWS Api to pull initial weather for address entered by user
                if (latitude && longitude) {
                    const nwsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`, {
                    // console.log(nwsResponse.length)
                    // nwsResponse.data to access weather information.
                    headers: {
                        'User-Agent': 'auth, r@r-hunter.com',
                      },
                    });
                    setLocationData(nwsResponse.data);
        
                    //Pull forecast url from locationData to get forecast
                    const forecastGridDataUrl = nwsResponse.data.properties?.forecastGridData;
                    if (forecastGridDataUrl) {
                    const forecastResponse = await axios.get(forecastGridDataUrl, {
                        headers: {
                            'User-Agent': 'auth, r@r-hunter.com',
                          },
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
    }
    };

    return (
        <>
    {/* Title and Search Bar Function */}
        <div className='app mx-auto'>
        <div className='mx-auto text-center w-[200px]'>
            {/* <h1 className='mx-auto mb-4'>Surf + Mystic</h1> */}
            <div className="search input flex rounded-lg justify-center">
                <input 
                value={address}
                className='input bg-neutral-700 border border-neutral-200 focus:outline-pink-200 m-2 p-4 rounded-lg'
                onChange={(event) => setAddress(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Enter Location...'
                type="text" />
            </div>

        </div>
        </div>
        <div>
            <div className='container mx-auto w-[50vw] justify-center'>
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

            <div className="humidity mt-2 text-center">
                {forecastData?.properties?.relativeHumidity?.values[0].value ? (
                <h1 className="text-bold text-xl">Humidity: {forecastData.properties.relativeHumidity.values[0].value.toFixed()}%
                </h1>
                ) : null}
            </div>

            <div className="weather mt-2 text-center">
                {forecastData?.properties?.weather?.values[0]?.value[0].weather ? (
                <h1 className="text-bold text-xl">
                    {forecastData.properties.weather.values[0].value[0].weather}
                </h1>
                ) : null}
            </div>

            <div className="chanceOfRain mt-2 text-center">
                {forecastData?.properties?.probabilityOfPrecipitation?.values[0].value ? (
                <h1 className="text-bold text-xl">
                    Precipitation: {forecastData.properties.probabilityOfPrecipitation.values[0].value}%
                </h1>
                ) : null}
            </div>

            <div className="windWave mx-auto w-[320px]">
                <div className='flex mx-auto border rounded-lg mt-4 w-[320px]'>
                    {/* Wind data ------------ */}
                    <div className='windData text-right w-[50vw]'>
                        <p className='mt-2 mr-4 text-pink-400'>WIND</p>
                        <div className="windDirection mt-2 mr-4 text-right">
                            {forecastData?.properties?.windDirection?.values[0].value ? (
                            <p className="text-bold">
                                Direction: {windDir(forecastData.properties.windDirection.values[0].value)} ({forecastData.properties.windDirection.values[0].value}°)
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
                <div className="buttons mx-auto pt-2">
                    <p className="text-pink-400 cursor-pointer text-sm text-right">
                    Add to Favorites
                    </p>
                </div>
            </div>

            <div className='googleMap mt-2'>
                <div className="text-left ml-10 mr-10 text-white p-2 text-m">
                    <iframe
                        className="w-full aspect-video rounded-lg"
                        src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
                        width="275"
                        height="300"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps">
                    </iframe>
                </div>
            </div>
        </div>         
    </>
    )
}

// {`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
// {`https://www.google.com/maps?q=${address}&output=embed`}
// {`https://www.google.com/maps/embed/v1/view?zoom=14&center=${latitude},${longitude}&key=${import.meta.env.GOOGLE_API_KEY}`}
// {`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.GOOGLE_API_KEY}&q=${latitude},${longitude}&zoom=15&maptype=roadmap`}
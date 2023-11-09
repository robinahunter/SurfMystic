import { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from "react-router-dom";

export default function HomePage() {
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('20.8455');
    const [longitude, setLongitude] = useState('-156.6541');
    const [locationData, setLocationData] = useState({})
    const [forecastData, setForecastData] = useState(null);
    const [addressEntry, setAddressEntry] = useState(false);
    const [geolocationInitiated, setGeolocationInitiated] = useState(true);
    // console.log(address)

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

// useEffect(() => {
//     // Fetch weather data for Honolulu, HI on mount (preload data before user selects a location)
//    const fetchLauniupokoLocation = async () => {
//        const response = await axios.get('https://api.weather.gov/points/20.8318,-156.6541');
//        setLocationData(response.data);

//    // Within the API follow the path locationData.properties.relativeLocation.forecastGridData to obtain url for forecast
//    const forecastGridDataUrl = response.data.properties?.forecastGridData;
//    if (forecastGridDataUrl) {
//        const forecastResponse = await axios.get(forecastGridDataUrl);
//        setForecastData(forecastResponse.data);
//        // console.log(forecastGridDataUrl)
//      }
//    } 
 
//      // Call the function to fetch data for Launiupoko on component mount
//      fetchLauniupokoLocation();
//    }, []);

// useEffect(() => {
//     if (!addressEntry && geolocationInitiated) {
//     // Only fetch user's location using Geolocation API if not manually entered
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setLatitude(position.coords.latitude.toFixed(4));
//         setLongitude(position.coords.longitude.toFixed(4));
//         setGeolocationInitiated(true);
//         console.log(latitude)
//         console.log(longitude)
//     });
//    }
// } 
// }, [addressEntry, geolocationInitiated]); 

const searchAddress = async (event) => {
    if (event.key === 'Enter') {
        try {
        const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_GOOGLE_API_KEY`);
        const location = googleResponse.data.results[0]?.geometry?.location;
        if (location) {
            setLatitude(location.lat.toFixed(4));
            setLongitude(location.lng.toFixed(4));
            // setGeolocationInitiated(false); // Turn off geolocation
            // setAddressEntry(true);
            fetchWeatherData();
            console.log(location)

        }
        } catch (error) {
        console.error('Error fetching location data:', error);
        }
    }
    };
    
useEffect(() => {
        // Fetch weather data for the user's location and Update when user enters location
        const fetchWeatherData = async () => {
          if (latitude && longitude) {
            const response = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
            setLocationData(response.data);

            // Within the API, follow the path locationData.properties.relativeLocation.forecastGridData
            // to obtain the URL for the forecast
            const forecastGridDataUrl = response.data.properties?.forecastGridData;
            if (forecastGridDataUrl) {
              const forecastResponse = await axios.get(forecastGridDataUrl);
              setForecastData(forecastResponse.data);
              console.log(forecastGridDataUrl)
            }
          }
        };

        // Call the function to fetch data for the user's location
        fetchWeatherData();
      }, [latitude, longitude]);


    
    // const handleKeyDown = (e) => {
    // if (e.key === 'Enter') {
    //     e.preventDefault();
    //     searchAddress(e);
    // }
    // };

return (
    <>
    {/* Title and Search Bar Function */}
    <div className='app flex'>
      <div className='mx-auto text-center'>
          {/* <h1 className='mx-auto mb-4'>Surf + Mystic</h1> */}
        <div className="search flex rounded-lg justify-center">
            <input 
            type='text'
            value={address}
            className='bg-neutral-700 border border-neutral-200 focus:outline-pink-200 m-2 p-4 rounded-lg'
            onChange={(event) => setAddress(event.target.value)}
            onKeyDown={searchAddress}
            placeholder='Enter Location...'
             />
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
                ) : (
                'No data'
                )}
            </div>

            <div className="weather mt-2 text-center">
                {forecastData?.properties?.weather?.values[0]?.value[0].weather ? (
                <h1 className="text-bold text-xl">
                    {forecastData.properties.weather.values[0].value[0].weather}
                </h1>
                ) : (
                'No description data'
                )}
            </div>

            <div className="chanceOfRain mt-2 text-center">
                {forecastData?.properties?.probabilityOfPrecipitation?.values[0].value ? (
                <h1 className="text-bold text-xl">
                    Precipitation: {forecastData.properties.probabilityOfPrecipitation.values[0].value}%
                </h1>
                ) : (
                'No data'
                )}
            </div>

            <div className='flex mx-auto border rounded-lg mt-4 w-[320px]'>
                {/* Wind data ------------ */}
                <div className='windData text-right w-[50vw]'>
                    <p className='mt-2 mr-4 text-pink-400'>WIND</p>
                    <div className="windDirection mt-2 mr-4 text-right">
                        {forecastData?.properties?.windDirection?.values[0].value ? (
                        <p className="text-bold">
                            Direction: {windDir(forecastData.properties.windDirection.values[0].value)} ({forecastData.properties.windDirection.values[0].value}°)
                        </p>
                        ) : (
                        'No data'
                        )}
                    </div>

                    <div className="windSpeed mr-4 text-right">
                        {forecastData?.properties?.windSpeed?.values[0].value ? (
                        <p className="text-bold ">
                            Speed: {(forecastData.properties.windSpeed.values[0].value * 0.621371192).toFixed()} MPH
                        </p>
                        ) : (
                        'No data'
                        )}
                    </div>

                    <div className="windGust mr-4 text-right">
                        {forecastData?.properties?.windGust?.values[0].value ? (
                        <p className="text-bold">
                            Gusts: {(forecastData.properties.windGust.values[0].value * 0.621371192).toFixed()} MPH
                        </p>
                        ) : (
                        'No data'
                        )}
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
                        'No waveHeight'
                        )}
                    </div>

                    <div className="wavePeriod ml-4 ext-left">
                        {forecastData?.properties?.wavePeriod?.values[0].value ? (
                        <p className="text-bold">
                            Period: {forecastData.properties.wavePeriod.values[0].value.toFixed()} sec
                        </p>
                        ) : (
                        'No wavePeriod'
                        )}
                    </div>

                    <div className="waveDirection ml-4 text-left">
                        {forecastData?.properties?.waveDirection?.values[0] ? (
                        <p className="text-bold">
                            Wave Direction: {forecastData.properties.waveDirection.values[0].toFixed()} degrees?
                        </p>
                        ) : (
                        'No waveDirection'
                        )}
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
import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
// import googleConfig from './../google.config.js'


export default function HomePage({ apiData, updateDetails, forecastData }) {

    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    // const googleApiKey = googleConfig.googleApiKey


    //Create search function to extract the latitude and longitude from the Google Maps API response and then use them to call the NWS API to get weather data
    const searchLocation = async (event) => {
    if (event.key === 'Enter') {

        const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAz6LmWDNhT2JNgrhZC2qEktbdOUjCicpM`);

        //Store the lat and long in variables
        const latitude = googleResponse.data.results[0]?.geometry?.location.lat.toFixed(4);
        const longitude = googleResponse.data.results[0]?.geometry?.location.lng.toFixed(4);
        console.log(latitude)
        console.log(longitude)

        //Pull lat long variables into NWS Api to pull initial weather for location
        if (latitude && longitude) {
            const nwsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
            console.log(nwsResponse)

            // nwsResponse.data to access weather information.
            setWeatherData(nwsResponse.data);
        } 
        setLocation([]);
    }


        //Useing nested axios requests to fetch data from another API endpoint as part of the existing API call,
        async function getData(url) {
            const res = await axios.get(url);
            setApiData(res.data);

            if (res.data.properties && res.data.properties.forecastGridData) {
            const forecastGridDataUrl = res.data.properties.forecastGridData;
            const forecastRes = await axios.get(forecastGridDataUrl);
            setForecastData(forecastRes.data);
            }
        } 
    }

    return (
        <>
            {/* Title and Search Bar Function */}
    <div className='app flex'>
      <div className='mx-auto text-center'>
          <h1 className='mx-auto mb-4'>Surf + Mystic</h1>
        <div className="search flex rounded-lg justify-center">
            <input 
            value={location}
            className='bg-neutral-700 border border-neutral-200 focus:outline-pink-200 m-2 p-4 rounded-lg'
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder='Enter Location...'
            type="text" />
        </div>
      </div>
    </div>
        <div>
            <div className='container mx-auto w-[50vw] justify-center'>
                <div className="top">
                    <div className="location">
                        {/* Pull Name Information from first NWS API and URl to Forecast for location */}
                    {apiData?.properties?.relativeLocation?.properties?.city && apiData?.properties?.relativeLocation?.properties?.state ? (
                    <h1>
                        {apiData.properties.relativeLocation.properties.city}, {apiData.properties.relativeLocation.properties.state}
                    </h1>
                    ) : null}

                    </div>
                </div>
            </div>
        </div>
                
        {apiData.city != undefined &&
            <div className="bottom p-2 mt-2 mx-auto w-[50vw] h-[60vh] justify-center">
               

                <button type="button" className="block mx-auto border-none p-1 mt-4 mb-8 rounded bg-emerald-400 hover:bg-yellow-500">
                    <Link to="/details" onClick={() => { updateDetails(apiData) }}>
                        MORE DETAILS
                    </Link>
                </button>
            </div>
        }
           
    </>
    )
}
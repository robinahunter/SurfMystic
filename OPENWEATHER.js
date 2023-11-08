return (
    <>
    <div>
        <div className='container mx-auto w-[50vw] justify-center'>
            <div className="top">
                <div className="location">
                {apiData?.properties?.relativeLocation?.properties?.city && apiData?.properties?.relativeLocation?.properties?.state ? (
                <h1>
                    {apiData.properties.relativeLocation.properties.city}, {apiData.properties.relativeLocation.properties.state}
                </h1>
                ) : null}

                </div>
            </div>
        </div>
    </div>
            
    {apiData.name != undefined &&
        <div className="bottom p-2 mt-2 mx-auto w-[50vw] h-[60vh] justify-center">
            {apiData?.properties?.forecastGridData}
            <div className="temp mt-2 text-center">
                {apiData.main ? <h1 className="text-bold">{apiData.main.temp.toFixed()}°F</h1> : 'null' }
            </div>
            <div className="description mb-3 text-center">
                {apiData.weather ? <p>{apiData.weather[0].main}</p> : 'No description data' }
            </div>
            <div className="feels text-center">
                {apiData.main ? <p>Feels Like: {apiData.main.feels_like.toFixed()}°F</p> : 'No comparison data' }
            </div>
            <div className="humidity text-center">
                {apiData.main ? <p>Humidity: {apiData.main.humidity}%</p> : 'No humidity data' }
            </div>
            <div className="wind text-center">
                {apiData.wind ? <p>{apiData.wind.speed.toFixed()} MPH</p> : 'No wind data' }
            </div>
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


// USER PAGE BACKUP

import AuthFormPage from '../AuthFormPage'
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function UserPage() {
  const { id } = useParams();
  const [userData, setUserData]=useState(null)

useEffect(()=> {
  fetch(`http://localhost:3000/api/users/${id}`, {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' },
    })
     .then((res) => res.json())
     .then((data) => {
      setUserData(data);
     })
     .catch((err) => console.error(err));
},[])
console.log(userData)

    return (
        <>
        <div className="w-[75vw] h-[80vh] mx-auto">
          <br /><br />
          <h2 className="text-white mx-auto text-3xl font-bold">Hello, { userData?.name }</h2>
          <p>Welcome message</p>
          <br />
          <div className="favoriteList">
            <ul>
              <li><p>'Place Holder Favorite Locations'</p></li>
              <li>1.</li>
              <li>2.</li>
            </ul>   
          </div> 
          <div className="notes">
            <ul>
              <li>
                <p>'Place Holder Notes'</p> 
              </li>
            </ul>
          </div>
          <div className="photos">
            <ul>
                <li>
                  <p>'Place Holder Photos'</p> 
                </li>
              </ul>
          </div>
        </div>
        </>
    )
  }
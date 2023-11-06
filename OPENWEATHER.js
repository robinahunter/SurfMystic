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
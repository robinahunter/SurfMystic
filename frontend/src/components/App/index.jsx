import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link } from 'react-router-dom'
import blueWave from '../../assets/bluewave.png'
import HomePage from '../HomePage'
import UserPage from '../UserPage'
import AboutPage from '../AboutPage'
import SearchPage from '../SearchPage'
import DetailsPage from '../DetailsPage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'
// import googleConfig from '../../../google.config.js'

function App() {
  // Store API data
  // const googleApiKey = config.googleApiKey;
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [apiData, setApiData] = useState({})
  const [detailsData, setDetailsData] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [latitude, setlatitude] = useState('')
  const [longitude, setlongitude] = useState('')
  const [forecastData, setForecastData] = useState(null);


  async function getData(url) {
      const res = await axios.get(url);
      setApiData(res.data); // Update the state with API data
   
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


  // `https://maps.googleapis.com/maps/api/geocode/json?address=${location}}&key=${GOOGLE_API_KEY}`

  //Once address is added obtain Latitude
  // {data?.results[0]?.geometry?.lat}
  //Obtain Longitude
  // {data?.results[0]?.geometry?.lng}

    
  useEffect(() => {
      // Replace with the location you want to query/ OpenWeatherMap API
    // getData(`https://api.openweathermap.org/data/2.5/weather?q=kahului&units=imperial&appid=1dfe787e4a4f3b8527b7a12362b58682`)
    // NOAA National Weather Service API
    getData(`https://api.weather.gov/points/${latitude},${longitude}`)
  }, [])

  // const searchLocation = async (event) => {
  //   if (event.key === 'Enter') {
  //     try {
  //       const response = await axios.get(url);
  //       updateDetails(response.data);
  //       setLocation('');
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // }

  // const searchLocation = async (event) => {
  //   if (event.key === 'Enter') {
  //     setLocation(event.target.value);
  //   }
  // }

  // Function to toggle the menu open and close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  
  // Handle user logout, 
  const handleLogout = () => {
    // Implement logic to clear user authentication, e.g., set isAuthenticated to false
    setIsAuthenticated(false);
    // Clear user token from localStorage or send a logout API request if needed
  }  

//  Create the HTML using JSX for the App component
return (
  <>
    {/* NavBar responsive styling with Tailwind */}
    <div className="w-[100vw] mx-auto p-2 max-w-7xl sm:px-6 lg:px-8">
      <nav className="flex mx-auto justify-between items-center">
        {/* Hamburger Menu Start */}
        <div className="flex w-[100vw] justify-between items-center">
            <Link to="/">
              <div className="flex">
                <ul className="pl-4">
                  <li className="w-12 justify-between" >
                    <img src={blueWave} alt="Blue Wave" />
                  </li>
                </ul>
              </div>
            </Link>
            <div className="flex items-center pr-4">
              <button type="button" onClick={toggleMenu} className="justify-between p2">
                  <div className="bg-pink-400 px-5 pt-1 rounded"></div>
                  <div className="bg-yellow-400 px-5 pt-1 mt-1.5 rounded"></div>
                  <div className="bg-cyan-400 px-5 pt-1 mt-1.5 rounded"></div>
              </button>
            </div>
        </div>
      </nav>
    </div>
        {/* Hamburger Menu End */}
        {menuOpen && (
        <div className="block bg-neutral-800 mt-1 py-1 pb-4">
          {/* Full NavBar Start */}
            <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-cyan-400 text-sm font-medium mr-2">
                <li>
                  <Link to="/">
                    <p className="p-2 text-white hover:text-cyan-200">home</p>
                  </Link>
                </li>
              </ul>
          </div>
          <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-emerald-400 text-sm font-medium mr-2">
                <li>
                  <Link to="/about">
                    <p className="p-2 text-white hover:text-emerald-200">about</p>
                  </Link>
                </li>
              </ul>
          </div>
          {/* <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-yellow-400 text-sm font-medium mr-2">
                <li>
                  <Link to="/search">
                    <p className="p-2 text-white hover:text-yellow-200">search</p>
                  </Link>
                </li>
              </ul>
          </div> */}

          {/* Add auth in the navbar to display logIn/SignUp or LogOut/Profile. Conditionally render based on authentication state */}
          {isAuthenticated ? (
            <>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-orange-600 text-sm font-medium">
                  <li>
                    <Link to="/logout" onClick={handleLogout}>
                      <p className="p-2 text-white hover:text-orange-200">sign out</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-grow">
                  <ul className="flex justify-center text-white border-b-2 border-b-pink-600 text-sm font-medium">
                      <li>
                          <Link to="/user">
                              <p className="p-2 text-white hover:text-pink-200">user</p>
                          </Link>
                      </li>
                  </ul>
              </div>
            </>
            ) : (
            <>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-orange-500 text-sm font-medium mr-2">
                  <li>
                    <Link to="/auth/signup">
                      <p className="p-2 text-white hover:text-orange-200">sign up</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-pink-600 text-sm font-medium">
                  <li>
                    <Link to="/auth/login">
                      <p className="p-2 text-white hover:text-pink-200">log in</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* Full NavBar End */}
        </div>
        )}

    
    {/* Routes */}
    <Routes>
      <Route path="/" element=
      {<HomePage apiData={apiData} url={`https://api.weather.gov/points/39.7456,-97.0892`} updateDetails={setDetailsData} forecastData={forecastData} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
      <Route path="/details" element={<DetailsPage {...detailsData} />} />
      <Route path="/auth/:formType" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/logout" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>


    {/* Footer */}
      <div className="mx-auto w-[50vw] flex flex-row justify-between items-center mb-0">
        <a href="https://github.com"><img className="h-9" src="https://i.postimg.cc/YCZRXsyB/Git-Hub-icon.png" /></a>
        <a href="https://www.instagram.com"><img className="w-6" src="https://i.postimg.cc/Bvh14y8F/instagram-icon-WHT.png" /></a>
        <a href="https://www.facebook.com/"><img className="w-6" src="https://i.postimg.cc/9QY7NzCJ/facebook-icon-WHT.png" /></a>
      </div>
    </>
  )
}

export default App;

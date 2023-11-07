import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link } from 'react-router-dom'
import blueWave from '../../assets/bluewave.png'
import HomePage from '../HomePage'
import UserPage from '../UserPage'
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'
// import googleConfig from '../../../google.config.js'

function App() {
  // State variables
  // const googleApiKey = config.googleApiKey;
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [detailsData, setDetailsData] = useState({})
  const [address, setAddress] = useState('')
  const [locationData, setLocationData] = useState({})
  const [forecastData, setForecastData] = useState(null);
  
    //(Update this with JavaScript Geolocation function to find users location)
    useEffect(() => {
       // Fetch weather data for Honolulu, HI on mount (preload data before user selects a location)
      const fetchHonoluluLocation = async () => {
          const response = await axios.get('https://api.weather.gov/points/20.8318,-156.6689');
          setLocationData(response.data);
  
      // Within the API follow the path locationData.properties.relativeLocation.forecastGridData to obtain url for forecast
      const forecastGridDataUrl = response.data.properties?.forecastGridData;
      if (forecastGridDataUrl) {
          const forecastResponse = await axios.get(forecastGridDataUrl);
          setForecastData(forecastResponse.data);
          console.log(forecastGridDataUrl)
        }
      } 
    
        // Call the function to fetch data for Honolulu on component mount
        fetchHonoluluLocation();
      }, []);

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
    <div className="flex mt-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <nav className="flex mx-auto justify-between items-center">
        {/* Hamburger Menu Start */}
        <div className="flex w-[90vw] justify-between items-center">
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
              <ul className="flex justify-center text-white border-b-2 border-b-cyan-400 text-sm font-medium">
                <li>
                  <Link to="/">
                    <p className="p-2 text-white hover:text-cyan-200">home</p>
                  </Link>
                </li>
              </ul>
          </div>
          <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-emerald-400 text-sm font-medium">
                <li>
                  <Link to="/about">
                    <p className="p-2 text-white hover:text-emerald-200">about</p>
                  </Link>
                </li>
              </ul>
          </div>

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
                          <Link to={`/user/${localStorage.getItem('userId')}`}>
                              <p className="p-2 text-white hover:text-pink-200">user</p>
                          </Link>
                      </li>
                  </ul>
              </div>
            </>
            ) : (
            <>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-orange-500 text-sm font-medium">
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
      <Route path="/" element={<HomePage 
      locationData={locationData} 
      address={address} 
      setLocationData={setLocationData}
      setForecastData={setForecastData}
      setAddress={setAddress} 
      forecastData={forecastData}     
      />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/auth/:formType" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/logout" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/user/:id" element={<UserPage 
      />} />
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

// Cite source for NavBar toggle: https://www.material-tailwind.com/docs/react/navbar
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react'
import HomePage from '../HomePage'
import UserPage from '../UserPage'
import AboutPage from '../AboutPage'
import SearchPage from '../SearchPage'
import DetailsPage from '../DetailsPage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'


function App() {
  // Store API data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [arrays, setArrays] = useState([])
  const [detailsData, setDetailsData] = useState({})


    // Async function to JSONify the query response  
    async function getData(url) {
        const res = await fetch(url) 
        const data = await res.json() 
        setArrays(arrays.concat(data)) // Update state with fetched data
        console.log(arrays)
    }

  // // Query GOOGLE GEOCODE API on component mount, and get Lat/Long for NWS API to pull up weather for that set location
  // useEffect(() => {
  //   getData(`https://maps.googleapis.com/maps/api/geocode/json?address=waikiki+beach,+honolulu,+HI&key=GOOGLE_API_KEY`);
  // }, [])

  // Query National Weather Service API on component mount, and get weather for this location as a test
  useEffect(() => {
    getData(`https://api.weather.gov/points/21.2793,-157.8291`);
  }, [])

// Handle user logout, 
const handleLogout = () => {
  // Implement logic to clear user authentication, e.g., set isAuthenticated to false
  setIsAuthenticated(false);
  // Clear user token from localStorage or send a logout API request if needed
};  

//  Create the HTML using JSX for the App component
return (
  <>
    {/* NavBar responsive styling with Tailwind */}
    <nav className="w-[100vw] p-2 sticky top-0 z-10 h-max max-w-full max-w-7xl  px-4 py-2 lg:px-8 lg:py-4">
      <div className="container-fluid flex mx-auto">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <div className="bg-pink-400 px-5 pt-1 rounded"></div>
                <div className="bg-yellow-400 px-5 pt-1 mt-1.5 rounded"></div>
                <div className="bg-cyan-400 px-5 pt-1 mt-1.5 rounded"></div>
            </button>
        <div className="flex items-center justify-between h-16">
          <div className="">
            <Link to="/">
              <ul className="flex text-center">
                <li>
                  <img className="lh-1 justify-center mx-auto w-14" src="/src/assets/blue-wave.svg" />
                </li>
                {/* <li>
                  <h1 className="px-2 flex text-white logo text-4xl">Surf Mystic</h1>
                </li> */}
              </ul>
            </Link>
          </div>
          <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-cyan-400 text-sm font-medium mr-2">
                <li className='nav'>
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
          <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-yellow-400 text-sm font-medium mr-2">
                <li>
                  <Link to="/search">
                    <p className="p-2 text-white hover:text-yellow-200">search</p>
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
        </div>
      </div>
    </nav>
    
    {/* Routes */}
    <Routes>
      <Route path="/" element={
      <HomePage arrays={arrays} getData={getData} setDetailsData={setDetailsData} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
      <Route path="/details" element={<DetailsPage {...detailsData} />} />
      <Route path="/auth/:formType" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/logout" element={<AuthFormPage setIsAuthenticated = {setIsAuthenticated} />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>

    {/* Footer */}
    <div className="flex flex-row items-center mb-0">
      <a href="https://github.com"><img className="ml-5 mb-7 h-12" src="https://i.postimg.cc/YCZRXsyB/Git-Hub-icon.png" /></a>
      <a href="https://www.instagram.com"><img className="ml-5 mb-8 w-8" src="https://i.postimg.cc/Bvh14y8F/instagram-icon-WHT.png" /></a>
      <a href="https://www.facebook.com/"><img className="ml-5 mb-8 w-8" src="https://i.postimg.cc/9QY7NzCJ/facebook-icon-WHT.png" /></a>
    </div>
    </>
  )
}

export default App;

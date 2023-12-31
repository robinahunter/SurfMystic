import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import blueWave from '../../assets/blueWave2.svg' 
import HomePage from '../HomePage'
import UserPage from '../UserPage'
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Function to toggle the menu open and close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  
  // Handle user logout, 
  const handleLogout = () => {
    // Implement logic to clear user authentication, e.g., set isAuthenticated to false
    setIsAuthenticated(false);
    // Clear user token from localStorage or send a logout API request
  }  

//  Create the HTML using JSX for the App component
return (
  <>
    {/* NavBar responsive styling with Tailwind */}
    <div className="flex mt-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <nav className="flex mx-auto justify-between items-center">
        {/* Hamburger Menu Start */}
        <div className="flex w-[90vw] justify-between items-center md:hidden">
            <Link to="/" onClick={toggleMenu}>
              <div className="flex">
                <ul className="pl-4">
                  <li className="w-12 justify-between" >
                    <img src={blueWave} alt="Blue Wave" />
                  </li>
                </ul>
              </div>
              <div className='block justify-between'>
                  <h2 className="text-white text-2xl">SurfMystic</h2>
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
        <div className="block lg:block bg-neutral-800 mt-1 py-1 pb-4 lg:flex lg:items-center lg:w-auto">
          {/* Full NavBar Start */}
          <div className="logo hidden lg:block">
            <Link to="/" onClick={toggleMenu}>
                <div className="flex">
                  <ul className="pl-4">
                    <li className="w-12 justify-between" >
                      <img src={blueWave} alt="Blue Wave" />
                    </li>
                  </ul>
                </div>
                <div className='flex justify-between'>
                    <h2 className="text-white text-2xl">SurfMystic</h2>
                </div>
              </Link>
            </div>
            <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-cyan-400 text-sm font-medium">
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    <p className="p-2 text-white hover:text-cyan-200">home</p>
                  </Link>
                </li>
              </ul>
          </div>
          <div className="flex-grow">
              <ul className="flex justify-center text-white border-b-2 border-b-emerald-400 text-sm font-medium">
                <li>
                  <Link to="/about" onClick={toggleMenu}>
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
                    <Link to="/logout" onClick={() => { handleLogout(); toggleMenu(); }}>
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
                    <Link to="/auth/signup" onClick={toggleMenu}>
                      <p className="p-2 text-white hover:text-orange-200">sign up</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-pink-600 text-sm font-medium">
                  <li>
                    <Link to="/auth/login" onClick={toggleMenu}>
                      <p className="p-2 text-white hover:text-pink-200">log in</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* Full Hamburger NavBar End */}
        </div>
        )}

        {/* Full NavBar for Lg Screen 768px and larger */}
        <div className="hidden mx-auto bg-neutral-800 mt-1 py-1 pb-4 md:flex md:items-center md:w-auto max-w-5xl">
          {/* Full NavBar Start */}
          
            <Link to="/" className="flex justify-center items-center">
                <div className="flex inline-flex items-center">
                  <ul className="">
                    <li className="w-11
                     mr-2 justify-start" >
                      <img src={blueWave} alt="Blue Wave" />
                    </li>
                  </ul>
                </div>
                <div className='flex inline-flex'>
                    <h2 className="text-white text-2xl mr-2">SurfMystic</h2>
                </div>
              </Link>
          
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

          {/* Add auth in the navbar to display logIn/SignUp or LogOut/Profile. Conditionally render based on authentication state */}
          {isAuthenticated ? (
            <>
              <div className="flex-grow">
                <ul className="flex justify-center text-white border-b-2 border-b-orange-600 text-sm font-medium mr-2">
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
          {/* Full NavBar 768px / End */}
        </div>

    
    {/* Routes */}
    <Routes>
      <Route path="/" element={<HomePage 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}  
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

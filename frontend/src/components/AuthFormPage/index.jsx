import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn, logOut } from "../../../utils/backend"

export default function AuthFormPage({setIsAuthenticated}) {
  const { formType } = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: "",
      password: "",
      name: "",
  });
  // Implement the Log Out functionality
  const handleLogOut = async () => {
      await logOut(); //logOut function 
      localStorage.removeItem('userToken'); // Remove the user's token from localStorage
      navigate('/'); // Redirect to the home page after logging out
  }

  const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  let actionText
  formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'

  // Execute auth logic on form submit
  async function handleSubmit(event) {
      // prevent the page from refreshing when the form is submitted
      event.preventDefault()
      // check what the URL parameter is to determine what request to make
      if (formType === 'login') {
          const { token, userId } = await logIn(formData)
          localStorage.setItem('userToken', token)
          localStorage.setItem('userId', userId)
           // Set isAuthenticated to true when the user logs in
          setIsAuthenticated(true)
          navigate(`/user/${userId}`);
      } else {
          const { token, userId } = await signUp(formData)
          localStorage.setItem('userToken', token)
          localStorage.setItem('userId', userId)
          // Set isAuthenticated to true when the user signs up
          setIsAuthenticated(true)
          navigate(`/user/${userId}`);
      }
      // redirect to the user page after signing/logging in
  }
  
  return (
      <div>
        <div className="">
          <div className="bg-neutral-800 rounded-lg p-8 w-full max-w-md mx-auto">
              <h2 className="text-3xl text-left font-bold text-white mb-8">{actionText}</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formType === 'signup' && (
                    <div>
                      <label className="block text-gray-100 font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full p-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-600"
                        id="name"
                        name="name"
                        type="name"
                        required
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  <div>
                      <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
                          Email
                      </label>
                      <input
                          className="w-full p-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-600"
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleInputChange}
                      />
                  </div>
                  <div>
                      <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                          Password
                      </label>
                      <input
                          className="w-full p-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-600"
                          id="password"
                          name="password"
                          type="password"
                          minLength="6"
                          required
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                      />
                  </div>
                  <div>
                      <button
                          type="submit"
                          className="py-1 px-2 bg-cyan-400 text-gray-100 rounded-md hover:bg-blue-600 transition duration-300">
                          {actionText}
                      </button>
                </div>
              </form>
          </div>
      </div>
  </div>
  );
}

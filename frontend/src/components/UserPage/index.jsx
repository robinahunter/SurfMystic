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
            <h2 className="text-white mx-auto text-3xl font-bold">{ userData?.name }</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
        </>
    )
  }
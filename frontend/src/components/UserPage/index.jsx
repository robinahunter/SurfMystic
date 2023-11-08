import AuthFormPage from '../AuthFormPage'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';

export default function UserPage() {
  const { id } = useParams()
  const [userData, setUserData]=useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editFormData, setEditFormData] = useState({
      name: '',
      email: '',
      password: '',
      favoriteLocation: '',
      note: '',
      image: ''
  })

    useEffect(()=> {
    fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            setUserData(data)
            // Update the editFormData when userData is available
            setEditFormData({
                name: data.name,
                email: data.email,
                password: data.password,
                favoriteLocation: editFormData.favoriteLocation,
                note: editFormData.note,
                image: editFormData.image,
                })
            })
        .catch((err) => console.error(err))
    },[id])
    console.log(userData)

    // Update the form fields as the user types
    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        event.preventDefault()

    const userId = ''    
    // Update user data
    axios.put(`http://localhost:3000/api/users/${userId}`, editFormData)
    .then((response) => {
        setUserData(response.data)
        setShowEditForm(false)
    })
    .catch((error) => {
        console.error('Failed to update user data:', error)
        // Handle the error as needed, e.g., display an error message to the user
        })
        setShowEditForm(false) 
    }


    // Delete a user
    function handleDelete() {
        deleteUser(data._id)
            .then(() => window.location.href = '/')
    }

    // EDIT USER FORM / NAME EMAIL PASSWORD
    // Render the form when showEditForm is true
    const editForm = showEditForm && (
        <form onSubmit={handleSubmit}
            className="bg-neutral-800 rounded-lg p-4 my-4 w-[60vw] mx-auto text-right">
            <input
                id='name'
                name="name"
                className="px-2 py-1 w-full bg-Neutral-700 text-white"
                placeholder={userData?.name}
                value={editFormData.name}
                onChange={handleInputChange}
            />
            <br />
            <input
                className="w-full p-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-600"
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={editFormData.email}
                onChange={handleInputChange}
            />
            <br />
            <input
                className="w-full p-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-600"
                id="password"
                name="password"
                type="password"
                minLength="6"
                required
                placeholder="Password"
                value={editFormData.email}
                onChange={handleInputChange}
            />
            <br />
                <input
                type="text"
                name="favoriteLocation"
                className="p-2 my-2 w-full bg-Neutral-700 text-white"
                placeholder="Save your favorite location here!"
                value={editFormData.favoriteLocation}
                onChange={handleInputChange}
            />
            <br />
            <textarea
                name="note"
                className="p-2 my-2 h-[100px] w-full bg-Neutral-700 text-white"
                placeholder="Leave notes on your favorite spots!"
                value={editFormData.content}
                onChange={handleInputChange}
            />
            <br />
            <input
                type="text"
                name="image"
                className="p-2 my-2 w-full bg-Neutral-700 text-white"
                placeholder="Upload image URL"
                value={editFormData.image}
                onChange={handleInputChange}
            />
                <button
                    type="submit"
                    className="text-white hover:bg-blue-600 font-bold py-1 px-4 bg-cyan-400 rounded cursor-pointer mr-1">
                    Save
                </button>
          </form>
    )


    return (
        <>
            <div className="userSection w-[75vw] mx-auto">
              <br /><br />
              <div className="name editUser flex">
                <div className="userName w-[50vw]">
                  <h2 className="text-white mx-auto text-3xl">Hello, { userData?.name }</h2>
                </div>
                <div className="buttons text-right w-[50vw]">
                  <p onClick={() => { setShowEditForm(true) }}
                  className="text-emerald-400 cursor-pointer text-sm">
                    Edit User
                  </p>
                  <p onClick={handleDelete}
                  className="text-pink-400 cursor-pointer text-sm">
                    Delete User
                  </p>
                </div>
              </div>
                {editForm}
              <div className="welcome">
              <p>Welcome to your dashboard:</p>
              </div>
                <br />
              <div className="locations">
                <ul>
                  <li>
                    <p>Locations:</p>
                  </li>
                  <li>
                  { userData?.favoriteLocation }
                  </li>
                </ul>
              </div>

              <div className="notes">
                <ul>
                  <li>
                    <p>Notes:</p>
                  </li>
                  <li>
                  { userData?.note }
                  </li>
                </ul>
              </div>

              <div className="image">
                <ul>
                  <li>
                    <p>Images:</p>
                  </li>
                  <li>
                  { userData?.image }
                  </li>
                </ul>
              </div>
            </div>
        </>
      )
    }
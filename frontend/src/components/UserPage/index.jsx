import AuthFormPage from '../AuthFormPage'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import deleteUser from '../../../utils/backend';

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
  // console.log(deleteUser)
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
                // favoriteLocation: editFormData.favoriteLocation,
                favoriteLocation: {
                  locationName: "Don't forget to insert here", // Name of the location 
                  locationUrl: "Don't forget to insert here", // Code or identifier for the location /NWS location code
                }, 
                note: editFormData.note,
                image: editFormData.image,
                })
            })
        .catch((err) => console.error(err))
    },[id])
    // console.log(userData)

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

   
    // Update user data
    axios.put(`http://localhost:3000/api/users/${id}`, editFormData, { 
      headers:{
        "Authorization": localStorage.getItem('userToken')
      }
    })
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
        deleteUser(id)
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
                className="p-2 my-2 w-full bg-Neutral-700 text-white"
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
                className="p-2 my-2 w-full bg-Neutral-700 text-white"
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
                value={editFormData.favoriteLocation.locationName}
                onChange={handleInputChange}
            />
            <br />
            <input
                type="text"
                name="favoriteLocation"
                className="p-2 my-2 w-full bg-Neutral-700 text-white"
                placeholder="Save your favorite location here!"
                value={editFormData.favoriteLocation.locationName}
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
                className="p-2 my-1 w-full bg-Neutral-700 text-white"
                placeholder="Upload image URL"
                value={editFormData.image}
                onChange={handleInputChange}
            />
            <br />
                <button
                    type="submit"
                    className="text-white hover:bg-blue-600 font-bold py-1 px-4 bg-cyan-400 rounded cursor-pointer mr-1">
                    Save
                </button>
          </form>
    )


    return (
        <>
            <div className="userSection w-[75vw] h-[100vh] mx-auto">
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
                    <p className='text-xs'>Locations:</p>
                  </li>
                  <li>
                  <p className='text-yello-500'>{ userData?.favoriteLocation?.locationName }</p>
                  </li>
                </ul>
              </div>

              <div className="notes">
                <ul>
                  <li>
                    <p className='text-xs pt-2'>Notes:</p>
                  </li>
                  <li>
                  <p className='text-cyan-400'>{ userData?.note }</p>
                  </li>
                </ul>
              </div>

              <div className="image">
                <ul>
                  <li>
                    <p className='text-xs pt-2'>Images:</p>
                  </li>
                  <li>
                    {/* Check if image is present, if it is truthy render img element */}
                  { userData?.image && <img className='w-[300px] rounded-lg pt-2' src={userData.image} alt="User Image" />}
                  </li>
                </ul>
              </div>
            </div>
        </>
      )
    }
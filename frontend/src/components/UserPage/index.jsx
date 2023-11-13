
import React, { useState, useEffect } from 'react'
import { deleteUser, updateUser } from '../../../utils/backend'
import { useParams } from "react-router-dom"
import noImage from '../../assets/NoImage.png' 

export default function UserPage() {
  const { id } = useParams()
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
    fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
   
            // Update the editFormData when editFormData is available
            setEditFormData({
              ...editFormData,
                name: data.name,
                email: data.email,
                password: data.password,
                })
            })
        .catch((err) => console.error(err))
    },[])
    // console.log(editFormData)

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
        updateUser(editFormData, id)
        setEditFormData(editFormData)
        setShowEditForm(false)
    }
    
    // Delete a user
    function handleDelete() {
        deleteUser(id)
            .then(() => window.location.href = '/')
    }

    // EDIT USER FORM / NAME EMAIL PASSWORD Location Notes Images
    // Render the form when showEditForm is true
    const editForm = showEditForm && (
        <form onSubmit={handleSubmit}
            className="bg-neutral-800 rounded-lg p-4 my-4 w-[60vw] mx-auto text-right">
            <input
                id='name'
                name="name"
                className="px-2 py-1 w-full bg-Neutral-700 text-white"
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
                <textarea
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
                  <h2 className="text-white mx-auto text-3xl">Hello, <span className='text-pink-400'>{ editFormData?.name }</span></h2>
                </div>
                <div className="buttons text-right w-[50vw]">
                  <p onClick={() => { setShowEditForm(true) }}
                  className="text-emerald-400 hover:text-emerald-200 hover:text-sm cursor-pointer text-xs">
                    Edit User
                  </p>
                  <p onClick={handleDelete}
                  className="text-pink-400 hover:text-pink-200 hover:text-sm cursor-pointer text-xs">
                    Delete User
                  </p>
                </div>
              </div>
                {editForm}
              <div className="welcome tex">
              <p>Welcome to your dashboard:</p>
              </div>
                <br />
              <div className="locations">
                <ul>
                  <li>
                    <p className='text-xs'>Locations:</p>
                  </li>
                  <li>
                  <p className='text-yellow-500'>{ editFormData?.favoriteLocation }</p>
                  </li>
                </ul>
              </div>

              <div className="notes">
                <ul>
                  <li>
                    <p className='text-xs pt-2'>Notes:</p>
                  </li>
                  <li>
                  <p className='text-cyan-400'>{ editFormData?.note }</p>
                  </li>
                </ul>
              </div>

              <div className="image">
                <ul>
                  <li>
                    <p className='text-xs pt-2'>Images:</p>
                  </li>
                  <li className='w-[300px] pt-2'>
                    {/* Check if image is present, if it is truthy render img element */}
                  { editFormData?.image && editFormData.image !== '' ? ( 
                    <img className='object-cover rounded-lg shadow-lg shadow-pink-200/25 hover:shadow-pink-500/25' src={editFormData.image} />
                  ) : (
                    <img className='object-fill' src={noImage} alt="No Image" />
                  )}
                  </li>
                </ul>
              </div>
            </div>
        </>
      )
    }
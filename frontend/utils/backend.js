import axios from 'axios'

// const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }

// Check for user token existance before creating the authHeader

export async function signUp(user) {
    const userToken = localStorage.getItem('userToken');
    const authHeader = userToken ? { headers: { 'Authorization': userToken } } : {};
    const { data } = await axios.post('/api/users/signup', user, authHeader)
    return data

}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

export async function logOut() {
    const response = await axios.post('/api/users/logOut')
    return response.data
}

export async function getLocations(locationName) {
    const { data } = await axios.get(`/api/location/${locationName}`)
    return data
}

export async function postLocation(location) {
    const userToken = localStorage.getItem('userToken');
    const authHeader = userToken ? { headers: { 'Authorization': userToken } } : {};
    const { data } = await axios.post('/api/locations', location, authHeader)
    return data
}

export async function updateUser(user, id) {
    console.log(user)
    const userToken = localStorage.getItem('userToken');
    const authHeader = userToken ? { headers: { 'Authorization': userToken } } : {};
    const { data } = await axios.put(`/api/users/${id}`, user, authHeader)
    return data
}

export async function deleteUser(id) {
    const userToken = localStorage.getItem('userToken');
    const authHeader = userToken ? { headers: { 'Authorization': userToken } } : {};
    const { data } = await axios.delete(`/api/users/${id}`, authHeader)
    return data
}
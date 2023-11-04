
// ---------------------------------------------------------------------------------------
// All routes on this page are prefixed with `localhost:3000/api/users`
// ---------------------------------------------------------------------------------------

// Required modules

const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()



// Require the db connection and models

const db = require('../models')


// Require the JWT config

const config = require('../../jwt.config.js')


// Routes
// LOG IN (log into a user account)
router.post('/login', async (req, res) => {
    // attempt to find the user by their email in the database
    const foundUser = await db.User.findOne({ email: req.body.email })
    // check to:
    // 1. make sure the user was found in the database
    // 2. make sure the user entered in the correct password
    if (foundUser && foundUser.password === req.body.password) {
        // if the above applies, send the JWT to the browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email
        })
        // if the user was not found in the database OR their password was incorrect, send an error
    } else {
        res.sendStatus(401)
    }
})

// SIGN UP ROUTE (create user)
router.post('/signup', (req, res) => {
    // Create a new user
    db.User.create(req.body)
        .then(user => {
            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })

        // send an error if the database fails to create a user followed by the error object
        //It's used to catch and handle errors that might occur in the preceding promise,
        .catch(error => {
            console.error("Error creating a new user:", error);
            res.status(500).json({ error: 'Could not create a new user, please try again' });
        })
})

// LOGOUT Route
router.post('/logout', (req, res) => {
    res.clearCookie('jwtToken'); // If cookies are used
    // Response indicating successful logout
    res.status(200).json({ message: 'Logged out successfully' });
});

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router

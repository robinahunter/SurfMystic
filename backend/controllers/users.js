// ---------------------------------------------------------------------------------------
// All routes on this page are prefixed with `localhost:3000/api/users`
// ---------------------------------------------------------------------------------------

// Required modules
// 'jwt-simple' is being imported as a Node.js module
// This module provides functions fro encoding and decoding JSON Web Tokens (JWTs)
const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()
// Require the db connection and models
const db = require('../models')
// Require the JWT config
const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    console.log(token)
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};


// Routes -----------------------------------------------------------
// INDEX Route (GET/Read): Will display user
router.get('/:id', function (req, res) {
    db.User.findById( req.params.id )
        .then(user => res.json(user))
})

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
            email: foundUser.email,
            userId: foundUser._id
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
            // Get newly created user ID
            const userId = user.id

            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: userId }, config.jwtSecret)
            res.json({ userId: userId, token: token })
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

// UPDATE Route (PUT/Update): This route receives a PUT request and 
// edits the specified user document using the request body
router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the profile
    const user = await db.User.findById(req.params.id)
    if (user._id.toString() === req.user.id) {
        // If it is the original author, update the User
        const updatedUser = await db.User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedUser)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// ADD Favorite Location ROUTE
// Your Express route handling the addition of the favorite location
router.post('/api/users/addToFavorites', async (req, res) => {
    try {
      const { address } = req.body;
  
      // Assuming you have the user object available in req.user after authentication
      // Update the user's favoriteLocation array
      req.user.favoriteLocation.push(address);
      await req.user.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error adding location to favorites:', error);
      res.status(500).json({ success: false, error: 'Failed to add location to favorites.' });
    }
  });



// DELETE Route - This route deletes a user document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', authMiddleware, async (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
        .then((user) => res.json(user))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router

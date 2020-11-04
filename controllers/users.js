const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const app = express();//app is an object



users.get('/new', (req, res) => {
  res.render('users/new.ejs', { currentUser: req.session.currentUser })
})

users.get('/login', (req, res) => {
  res.render('users/login.ejs', { currentUser: req.session.currentUser })
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
req.session.currentUser = createdUser//if createdUser is defined, we want to set the session
    console.log('user is created', createdUser)
    res.redirect('/opera')
  })
})



users.post('/login', (req, res) => {
  // usernmae is found and password matches
  // successful Lohengrin

  //username is not fount == we do not care about the Password
  //unsuccessful Lohengrin

  // username is found but password doesn't matches
  // unsuccessful Lohengrin

  // etc
User.findOne({username: req.body.username } , (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had problem')
    } else if (!foundUser) {
    // if found user is undefined /null  (not found)
    res.send('<a href="/">Sorry, no user found </a>')
    } else {
// the user is found!! eyJhcHBfaWQiOjEyMDd9

// if the passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
  // add the user to our sessions
        req.session.currentUser = foundUser
// redirect back to our Homepage
      res.redirect('/')

      } else {
  // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})





module.exports = users

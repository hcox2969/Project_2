const bcrypt = require('bcrypt')
const express = require('express')
const usersSessions = express.Router()
const User = require('../models/users.js')


usersSessions.get('/new', (req, res) => {
res.render('users/new.ejs', { currentUser: req.session.currentUser })
})

// on session sform submit (log in)
usersSessions.post('/', (req, res) => {
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

usersSessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
module.exports = usersSessions

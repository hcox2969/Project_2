require('dotenv').config()
const express = require('express'); //from documentation: express is function
const app = express();//app is an object
// Mongoose dependencies:
const mongoose = require('mongoose')

//**************Include the method-override package
const methodOverride = require('method-override');
//after app has been defined, use method.Override.
app.use(methodOverride('_method'));

//env variables
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// to use app.css file:
//tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));


// connect to Mongo and have it connect to the sub-database tweets
 // if it does not exist it will be created

 // in order to submit the new form:
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 // Global configuration
/*
const mongoURI = 'mongodb://127.0.0.1:27017/' + 'operas'
const db = mongoose.connection
// Connect to Mongo
mongoose.connect(mongoURI, {
 useFindAndModify: false,
 useNewUrlParser: true,
 useUnifiedTopology: true,
}, () => {
 console.log('the connection with mongod is established')
})
*/


// ***********Connect Express to Mongo*****w06d01**Instructor Notes
//... and then farther down the file
mongoose.connect(mongodbURI, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
// include the ./model/opears.js

//const operas = require('./models/opears.js')

//Use Controller File in Server.js
const operaController = require('./controllers/operas.js');
app.use('/opera', operaController);
app.use('/', (req, res) => {
  res.redirect('/opera')
})
// port listener:
app.listen(PORT, () => {
    console.log("I am listening on port", PORT);
});

require('dotenv').config()
const express = require('express'); //from documentation: express is function
const app = express();//app is an object

// engaging file .env:
console.log(process.env.PORT);
const port = process.env.PORT || 3003;

// to use app.css file:
//tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));
// Mongoose dependencies:
const mongoose = require('mongoose')
const Opera = require('./models/operas.js')
// connect to Mongo and have it connect to the sub-database tweets
 // if it does not exist it will be created

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
//**************Include the method-override package
const methodOverride = require('method-override');
//after app has been defined, use method.Override.
app.use(methodOverride('_method'));


// ***********Connect Express to Mongo*****w06d01**Instructor Notes
//... and then farther down the file
mongoose.connect('mongodb://localhost:27017/operas', { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
// include the ./model/opears.js

//const operas = require('./models/opears.js')

// in order to submit the new form:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// communicate with server:
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//let mongoose establish connection with mongo and see if it works:
//Opera.find({}, (err, operas) => {
 //console.log(operas);
  //db.close();
//});

//************Create New Route******w06d01**Instructor Notes***
app.get('/opera/new', (req, res) => {
  res.render('new.ejs');
});

//*********Create Create Route***w06d01**Instructor Notes***
//app.post('/opera/', (req, res) => {
//  res.send(req.body);
//});

app.post('/opera/', (req, res)=>{
    Opera.create(req.body, (error, createdOpera) => {
      if  (error) {console.log(error)}
      else {
      console.log(createdOpera)
      res.redirect('/opera')
       //res.send(createdOpera)
     }
  })
})

//
/*
app.post('/opera/', (req, res) => {
Opera.create(req.body, (error, createdOpera) => {
console.log(createdOpera)
//res.send(req.body);
res.redirect('/opera')
})
});
*/
//*****************Create INDEX Route*******w06d01/***instructor notes****
//app.get('/opera', (req, res) => {
//  res.send('index');
//});
// touch views/index.ejs
// render the ejs file
//app.get('/opera', (req, res) => {
  //res.render('index.ejs');
//});
// have Index Route Render All operaSchema
app.get('/opera', (req, res) =>{
  Opera.find({}, (error, allOperas) => {
    res.render('index.ejs', {
      opera: allOperas
    })
  })
})

//*************Create show.ejs
app.get('/opera/:id', (req, res) =>{
  Opera.findById(req.params.id, (err, allOperas) => {
    res.render('show.ejs', {
      opera: allOperas
    })
  })
})


//***********Delete Route******
app.delete('/opera/:id', (req, res) => {
  Opera.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/opera');
  })
})

//*************Edit Route********
app.get('/opera/:id/edit', (req, res)=>{
    Opera.findById(req.params.id, (err, allOperas)=>{
        res.render(
    		'edit.ejs',
    		{
    		opera: allOperas
    		});
    });
});
//*********Create an PUT route**'update'***
app.put('/opera/:id', (req, res)=>{
    Opera.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      //res.send(updatedModel);
      res.redirect('/opera');
    });
});

// port listener:
app.listen(port, () => {
    console.log("I am listening on port", port);
});

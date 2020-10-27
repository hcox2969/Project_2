const express = require('express');
const router = express.Router();
const Opera = require('../models/operas.js')
// communicate with server:
//router.get('/', (req, res) => {
  //res.send('Hello World!');
//});
//let mongoose establish connection with mongo and see if it works:
//Opera.find({}, (err, operas) => {
 //console.log(operas);
  //db.close();
//});

//************Create New Route******w06d01**Instructor Notes***
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

//*********Create Create Route***w06d01**Instructor Notes***
//app.post('/opera/', (req, res) => {
//  res.send(req.body);
//});

router.post('/', (req, res)=>{
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
router.get('/', (req, res) =>{
  Opera.find({}, (error, allOperas) => {
    res.render('index.ejs', {
      opera: allOperas
    })
  })
})

//*************Create show.ejs
router.get('/:id', (req, res) =>{
  Opera.findById(req.params.id, (err, allOperas) => {
    res.render('show.ejs', {
      opera: allOperas
    })
  })
})


//***********Delete Route******
router.delete('/:id', (req, res) => {
  Opera.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/opera');
  })
})

//*************Edit Route********
router.get('/:id/edit', (req, res)=>{
    Opera.findById(req.params.id, (err, allOperas)=>{
        res.render(
    		'edit.ejs',
    		{
    		opera: allOperas
    		});
    });
});
//*********Create an PUT route**'update'***
router.put('/:id', (req, res)=>{
    Opera.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      //res.send(updatedModel);
      res.redirect('/opera');
    });
});

module.exports = router;
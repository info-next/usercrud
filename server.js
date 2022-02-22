const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const http = require('http');


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require Notes routes
require('./app/routes/user.routes')(app);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    // res.sendFile(__dirname + '/index.html')
  })

  // app.post('/quotes', (req, res) => {
  //   console.log('response!')
  //   console.log(req.body)
  // })


// app.listen(port,host, function() {
//     console.log('listening on','http://'+host+':'+port)
//   })
const port = process.env.PORT || 3000;
const server= http.createServer(app);
server.listen(port,() => {
  console.log(`Server running at port `+port);
});
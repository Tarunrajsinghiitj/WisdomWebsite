const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const hbs = require('hbs')
const homeRouter = require('./routers/homerouter')
const port = process.env.PORT || 8080;
const app = express();


// db connect
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/studentsdata',{useNewUrlParser: true});
const db = mongoose.connection;

db.on("error",()=>{
    console.log("error in connection");
})
db.once("open",()=>{
    console.log("connected successfully")
})


app.set('view engine','hbs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/' , homeRouter);   // Use the page where we want to use the router , default i m using at index 
app.use(express.static('public'));
app.listen(port);
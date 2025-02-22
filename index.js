const express = require('express')
const path = require('path')
const router = require('./router/userRouter')
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine" , "ejs")
app.set("views", path.join(__dirname, "views"))

app.use('/' , router)

app.listen( 3001,()=>{
  console.log("server connected");
  
})
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const PORT =3000;

// dotenv.config({path:'./config.env'});
const PORT = process.env.PORT || 5000;
// const PORT =5000;

require("./db/conn");
require("./Model/user");
require("./Model/post");

app.use(express.json()); //before destructuring the data with the server , use this before initializing the routes

app.use(require("./Routes/auth"));
app.use(require("./Routes/post"));
app.use(require("./Routes/user"));

// const customMiddleware= (req,res,next) =>{
//   console.log("middleware executed")
//   next()
// }

// app.get('/', (req, res) => {
//   res.send('Hello world');
//   console.log('this is home page')
// })
// app.get('/about', customMiddleware, (req, res) => {
//   res.send('GET request to the about page')
// })
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

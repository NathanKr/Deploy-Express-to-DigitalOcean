console.log("app is loading ...");
const morgan = require('morgan')

const express = require("express"),
  PORT = 8080;
const app = express();

// -- every request will be looged to the console
app.use(morgan('combined'))


app.get('/api1' , (req,res) =>{
    res.sendStatus(200)
})

app.get('/api2' , (req,res) =>{
    res.sendStatus(200)
})

app.get('/' , (req,res) =>{
  res.send('<h1>Hello from Nathan Krasney</h1>')
})


app.listen(PORT, () => console.log(`server is listening on port : ${PORT}`));

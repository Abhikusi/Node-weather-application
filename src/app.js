const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
     res.render('index', {
         title: "The weather teller :)",
         name: "Abhishek"
     })
})

app.get ('/about', (req, res) => {
    res.render('about', {
        title: "About me.",
        name: "Abhishek"
    }
    )
})

app.get ('/help', (req, res) => {
    res.render('help', {
        title: "Welcome to help page!",
        name: "Abhishek"
    }
    )
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error: "Please provide an address!"
         })
    }
     geocode (req.query.address, (error, {latitude, longitude, location } = {}) => {
    
        if (error){
            return res.send({error})
        }
   
    forecast(latitude, longitude, (error, ForecastData) => {
            
        if(error){              
             return console.log({error})
        }
           res.send({
               Forecast: ForecastData, location,
               Address : req.query.address
           })
    })
  })
})

app.get ('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search team!"
        })
    }
    
     console.log(req.query.search)
     res.send({
        product: []
    })
      
})


app.get('/help/*', (req, res)=>{
    res.render('error', {
          title: 'error 404',
          name: 'Abhishek',
          errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res)=>{
   res.render('error', {
       title: 'error 404',
       name: 'Abhishek',
       errorMessage: 'Page not found.'
   })
})


app.listen(3000, ()=>{
    console.log("Server is listening at port 3000.")
})
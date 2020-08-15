const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath= path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Alyona Rodin'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Alyona Rodin"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        message:'This is some help text.',
        title:'Help',
        name:'Alyona Rodin'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address,(error,{latitude, longtitude, location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({location:'New York', 
    //           forecast:'It is sunny',
    //           address: req.query.address
    //         })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide serach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Alyona Rodin',
        message: 'Help article not found.'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Alyona Rodin',
        message:'Page not found.'})
    })

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
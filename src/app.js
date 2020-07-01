const path = require('path')
const axios = require('axios')
const express = require('express')
const hbs = require('hbs')
const app = express()

// API DETAILS FOR WEATHER 
API_KEY = 'bb3474a34c7838a1a5c940d01e8018bb';
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

 // Setting up Templates with handlebar
 app.set('views', path.join(__dirname, '../template/views'));
 app.set('view engine', '.hbs');
 hbs.registerPartials(path.join(__dirname,'../template/partials'))


 // *********************************************************/
            // SETUP WEB-SERVERS WITH EXPRESS // 

 // app.com         ->      root url
 // app.com/help    ->      help route

    // First THING -> Look for a match in the public folder
    // serving up static assets ... public directory
    app.use(express.static(path.join(__dirname,'../public/')))
 

 // *********************************************************/


app.get('', (req, res) => {
    res.render('index', {
        title: 'Legit Domoz',
        name: 'Dotun Akindele'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: "About Page",
        name: "Dotkeyz we are in the AboutPage"
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: "Help Page",
        name: "Dotkeyz we are in the help page"
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Nothing to search for'
        })
    }
    res.send({
        products: []
    })

})

app.get('/weather', (req, res) => {
    
    if(!req.query.q) {
        return res.send({
            error: "You did not provide a location to search for"
        })
    }

    (async() => {
        try{
            console.log(req.query.q)
            const response =  await axios.get(BASE_URL, {
            params: {
                q:req.query.q,
                APPID:API_KEY,
            }
        })
        res.send(response.data)  
      }
        catch(e){
            res.send(e)
        }   
    })();
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Page NOT FOUND'
    })
})

console.log('Beautiful Experience')
// to start the server 
 app.listen(3000, ()=> {
     console.log('The server has started on port 3000')
 })
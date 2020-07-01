
API_KEY = 'bb3474a34c7838a1a5c940d01e8018bb';
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Select the element from the html document 
// What comes back is a JavaScript representation of the element.
// To execute a code when a user interacts with the element, add an event listener.
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-body')
const messageTwo = document.querySelector('#error-body')

//messageOne.textContent = 'This is quit interesting ... '

WeatherApi = async search => {
    let url = ''
    let response = ''
    try{
        messageOne.textContent = 'Loading ... '

        url = await fetch(`${BASE_URL}?q=${search}&APPID=${API_KEY}`)
        response = await url.json()
        if(response.cod === 401){
            messageOne.textContent = ''
            messageTwo.textContent = 'We have technical issues. We would bounce back shortfly'
            return console.log('We have technical issues. We would bounce back shortfly')
        }
        else if(response.cod === '404' || response.cod === '400'){
            messageOne.textContent = ''
            console.log('error')
            messageTwo.textContent = `ERROR: ${response.message}`
            return console.log(`ERROR: ${response.message}`)
            
        }
    }
    catch(e){ 
        console.log('error')
        messageOne.textContent = ''
        messageTwo.textContent = 'We have technical issues. We would bounce back shortfly'
        return console.log(e)
    }
    messageOne.textContent = ''
    
    messageTwo.textContent = `${search.toUpperCase()} has Longitude ${response.coord.lon} and Latitude ${response.coord.lat}. The weather is going to be characterized by ${response.weather[0].description}`
}



weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    WeatherApi(search.value)
})

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
    messageOne.textContent = 'Loading ... '
    console.log('abeg')
    console.log(search.length)
    url = await fetch(`/weather?q=${search}`)
    response = await url.json()
    console.log(response)    

    if(response.error){
        messageTwo.textContent = 'ERROR ... Please try another search !'
        messageOne.textContent = ''
        return;
    }

    else {
       
        messageOne.textContent = `${search.toUpperCase()} has Longitude ${response.coord.lon} and Latitude ${response.coord.lat}. The weather is going to be characterized by ${response.weather[0].description}`
        
    }
}



weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    messageOne.textContent = ''
    messageTwo.textContent = ''
    WeatherApi(search.value)
})
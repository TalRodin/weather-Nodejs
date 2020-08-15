console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=data.error
        }else{
            
            messageOne.textContent=data.location
            console.log(data.forecast)
            messageTwo.textContent=`It is ${data.forecast.weather_descriptions}. The temperature is ${data.forecast.temperature} and feelslike it is ${data.forecast.feelslike}.`
            
        }   
      })
   })
})
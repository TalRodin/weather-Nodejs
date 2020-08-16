const request = require('request')

const forecast = (latitude,longtitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=791c87d86b0bc6d6d00b7cfa9be3b38d&query=${latitude},${longtitude}&units=f`
    request({url,json:true}, (error, {body} )=>{
        
        if(error){
            callback('Unable to connect to weather service!',underfined)
        }else if(body.error2){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined,
                
                {
                weather_descriptions: body.current.weather_descriptions[0],
                weather_icons: body.current.weather_icons[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
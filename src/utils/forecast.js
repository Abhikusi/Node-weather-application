const request = require('request')

const forecast = (latitude , longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ecbafa64278776252138e194260a1917/'+ latitude +',' + longitude +'?units=si'

    request({url, json:true}, (error, response) => {
     
    if(error){
        callback("Unable to connect to weather services!")
    }else if(response.body.error){
        callback("Unable to locate the place!")
    }else{
        callback(undefined, response.body.daily.data[0].summary + " There is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain. Maximum temperature for today is " + response.body.daily.data[0].temperatureHigh + " degrees and minimum temperature for today is " + response.body.daily.data[0].temperatureLow + " degrees." )
        
      
   }
})


}

module.exports = forecast
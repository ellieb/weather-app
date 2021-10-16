const request = require('request')

const WEATHERSTACK_API_KEY = '719f196e50cd5357a0f2c78347bdb9b8'

const forecast = (latitude, longitude, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?query=${latitude},${longitude}&access_key=${WEATHERSTACK_API_KEY}&units=m`
  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      const errorMsg = 'Unable to connect to weather services'
      callback(errorMsg, undefined)
    } else if (body.error) {
      const errorMsg = 'Unable to resolve given coordinates'
      callback(errorMsg, undefined)
    } else {
      const data = body.current
      callback(undefined, data)
    }
  })
}

module.exports = forecast

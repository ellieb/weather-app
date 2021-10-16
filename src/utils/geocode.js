const request = require('request')

const MAPBOX_API_KEY =
  'pk.eyJ1IjoiZWJhZHVuIiwiYSI6ImNrdXIwMWo3ejA1dXYzMXFqOTJubm1iM2EifQ.up-w7OlzMkoiQM8_htjgsw'

const geocode = (searchAddress, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    searchAddress
  )}.json?access_token=${MAPBOX_API_KEY}&limit=1`
  request({ url: mapboxUrl, json: true }, (error, { body }) => {
    if (error) {
      const errorMsg = 'Unable to connect to location services'
      callback(errorMsg, undefined)
    } else if (body.message || body.features.length === 0) {
      const errorMsg = 'Unable to find given location'
      callback(errorMsg, undefined)
    } else {
      const [longitude, latitude] = body.features[0].center
      const data = {
        location: body.features[0].place_name,
        longitude: longitude,
        latitude: latitude,
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode

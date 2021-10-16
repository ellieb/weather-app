const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ellie',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ellie',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ellie',
    helpText: 'This is helpful',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        })
      }

      forecast(latitude, longitude, (error, weatherData) => {
        if (error) {
          return res.send({
            error: e,
          })
        }

        res.send({
          address: req.query.address,
          location: location,
          forecast:
            weatherData.weather_descriptions[0] +
            '. It is ' +
            weatherData.temperature +
            ' degrees out and feels like ' +
            weatherData.feelslike +
            ' degrees out.',
        })
      })
    }
  )
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    name: 'Ellie',
    message: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    name: 'Ellie',
    message: 'Page not found',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

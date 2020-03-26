const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nick'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nick'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Nick',
    message: 'You have messed up and are now on the help page. LOL good luck with fixing this one!'
  });
})

app.get('/weather/', ({ query }, res) => {
  const { address } = query

  if (!address) {
    return res.send({
      error: "Enter an address to get the weather!"
    })
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        "forecast": forecast,
        "location": location,
        "address": address,
      });
    })
  });


})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    name: 'Nick',
    errorMessage: '404: Help page not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nick',
    errorMessage: '404: Page not found'
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000!")
});
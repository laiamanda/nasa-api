const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const API_KEY = process.env.API_KEY;

app.get('/', async (req, res) => {
  // Astronomy Picture of the Day
  let title = '';
  let date = '';
  let explanation = '';
  let hdurl = '';
  // Make an Axios calls to NASA
  await axios
    .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(function(response) {
      title = response.data.title;
      date = response.data.date;
      explanation = response.data.explanation;
      hdurl = response.data.hdurl;
    });

  res.render('landing', {
    title: title,
    date: date,
    explanation: explanation,
    hdurl: hdurl
  });
});

app.get('/asteroids', (async (req, res) => {
  // Make an Axios call to Near Earth Object Web Service
  await axios
    .get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${API_KEY}`)
    .then(function(response) {
      console.log(response.data)
    })
  res.render('asteroids');
}));

PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});
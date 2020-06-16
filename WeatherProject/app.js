const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const apiKey = "b5bfe54bf1ce3df908b8b2d4d18bb194"
  const units = "Imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units

  https.get(url, function (response) {
    console.log(response.statusCode)


    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write('<h1>The weather is currently ' + weatherDescription + '</h1>')
      res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees Fahrenheit</h1>')
      res.write("<img src=" + imageURL + ">")
      res.send();
    });
  });
});

app.listen(3000, () => console.log('Server is running in port 3000.'))

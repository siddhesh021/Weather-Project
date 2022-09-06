const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname+"/weather.html");
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res) {
  cityName = req.body.cityName;
  console.log(cityName);


  const query = cityName;
  const appkey = "2657cd13e827c475bbe33c4503f98a43";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+appkey;

    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data) {

        const weatherData = JSON.parse(data);

        const temp = weatherData.main.temp;
        console.log(temp);
        const description = weatherData.weather[0].description

        const icon = weatherData.weather[0].icon
        const imageurl = "https://api.openweathermap.org/img/wn/"+icon+"@2*.png"

        res.write("<h1>The Temperature is "+temp+" degre Celcius</h1>");
        res.write("<p>Currently The atmosphere is "+description+"</p>");
        res.write("<img src="+imageurl+">");
        res.send();
      });
    });
});





app.listen('3000', function() {
  console.log("listening to port 3000");
});

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "bab2e3ec6a21f4095cbe11f03f36c436";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=" + units + "&q=" + query;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees F.</h1>");
            res.write("<img src='" + imageURL + "'/>");
            res.send();

        })
    });

});




app.listen(3000, function () {
    console.log("Sever 3000 up and running!");
});
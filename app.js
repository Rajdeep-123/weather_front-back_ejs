const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const { json } = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.render("Search");
});

app.post("/", function (req, res) {

    const name = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=f1ebab0d740525d33b8bef7132298543`;
    // API calling
    https.get(url, function (response) {
        response.on('data', function (d) {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const max_temp = weatherData.main.temp_max;
            const min_temp = weatherData.main.temp_min;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const country = weatherData.sys.country;
            const city = weatherData.name;
            const sunrise = weatherData.sys.sunrise;
            console.log(sunrise);

            const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
           // console.log(temp);
          //  console.log(description);
           // console.log(max_temp);
           // console.log(min_temp);
            //console.log(weatherData);

            res.render("weather", {
                temprature: temp,
                maximumT: max_temp,
                minimumT: min_temp,
                des: description,
                logo: icon_url,
                city: city,
                country: country,
                sunrise: sunrise


            })







        });
    });



})


app.post("/ajax",(req,res)=>{
    const myLatitude = req.body.latitude;
    const myLongitude = req.body.longitude;
    console.log("Sucess!");
    console.log(myLatitude+" "+myLongitude);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&units=metric&appid=f1ebab0d740525d33b8bef7132298543`;
    https.get(url, function (response) {
        response.on('data', function (d) {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const max_temp = weatherData.main.temp_max;
            const min_temp = weatherData.main.temp_min;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const country = weatherData.sys.country;
            const city = weatherData.name;

            const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            const myObj = {
                temprature: temp,
                maximum_temp: max_temp,
                minimum_temp: min_temp,
                wDescription: description,
                myIcon: icon_url,
                countryName: country,
                cityName: city
            }

            res.send(JSON.stringify(myObj));









        });
    });

})










app.listen(4000, function () {
    console.log("Server has staretd on port 3000");
})
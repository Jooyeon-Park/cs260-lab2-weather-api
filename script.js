window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    //getElementById
    document.getElementById("weatherSubmit").addEventListener("click", function(event) {
      event.preventDefault();
      const value = document.getElementById("weatherInput").value;
      if (value === "")
        return;
      console.log(value);


      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=f5231db95fd58bf095f2e51f2d898b7d";
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log(json);


          let results = "";
        results += '<br><h3>Weather in ' + json.name + "</h3>";
        for (let i=0; i < json.weather.length; i++) {
        results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += '<h5>Feels like<br>' + json.main.feels_like + "&deg;F</h5>"
        results += "<p>"
        results += '<h5>Humidity<br>' + json.main.humidity + "%</h5>"
        if (json.main.humidity >= 60)
           results+= '<h5>(Uncomfortably Humid)<br></h5>'
        else if ((json.main.humidity < 60) && (json.main.humidity > 20)) {
           results+= '<h5>(Comfortable Humidity)<br></h5>'
        }
        else
           results+= '<h5>(Uncomfortably Dry)<br>'
        results += '<br>'
        for (let i=0; i < json.weather.length; i++) {
           results += json.weather[i].description
           if (i !== json.weather.length - 1)
           results += ", </h5>"
        }
        results += "</p><br><hr>";
        document.getElementById("weatherResults").innerHTML = results;
        });


    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=f5231db95fd58bf095f2e51f2d898b7d";
      fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);

        let forecast = "";
      forecast += "<br><h3>5-day/3-hour weather forecast</h3>"
    for (let i=0; i < json.list.length; i++) {
      forecast += "<br><b>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</b>";
      forecast += "<p>Temperature: " + json.list[i].main.temp + "<br>" ;
      forecast += "Feels like: " + json.list[i].main.feels_like + "</p>";
      forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      forecast += "<br><br>";
    }

  document.getElementById("forecastResults").innerHTML = forecast;
          });


    });
});

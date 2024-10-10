document.addEventListener("DOMContentLoaded",() =>{
    const Submission = document.getElementById("Submission");
    const Search = document.getElementById("Search");
    const CTemp = document.getElementById("CTemp");
    const Humid = document.getElementById("Humid");
    const Windy = document.getElementById("Windy");
    const Temp = document.getElementById("Temp");
    const City = document.getElementById("City-Searched");
    const WeatherC = document.getElementById("Weather-condition");
    const Icon = document.getElementById("Weather-Icon");
    const Image = document.getElementsByClassName("Forecast-img");
    const MaxMin = document.getElementsByClassName("Max-Min");
    const Describe = document.getElementsByClassName("Description");
    const Location = document.getElementById("User-Location");
    const DateandTimes = document.getElementById("Date-and-Time");
    const Background = document.getElementById("Weather-container");
    const Dayss = document.getElementsByClassName("Days");
    const Fahernheit = document.getElementById("Fahrenheit");
    const Celsius = document.getElementById("Celsius");
    let Mode = 0;
    const DayMap = new Map();
    DayMap.set(1,"Monday");
    DayMap.set(2,"Tuesday");
    DayMap.set(3,"Wednsday");
    DayMap.set(4,"Thursday");
    DayMap.set(5,"Friday");
    DayMap.set(6,"Saturday");
    DayMap.set(0,"Sunday");
    const MonthMap = new Map();
    MonthMap.set(0,"January");
    MonthMap.set(1,"Feburary");
    MonthMap.set(2,"March");
    MonthMap.set(3,"April");
    MonthMap.set(4,"May");
    MonthMap.set(5,"June");
    MonthMap.set(6,"July");
    MonthMap.set(7,"August");
    MonthMap.set(8,"September");
    MonthMap.set(9,"October");
    MonthMap.set(10,"November");
    MonthMap.set(11,"December");
    function DateandTime(DateTime ,Offset){
    const PreDate = new Date(DateTime * 1000);
    const TimeOffset = Offset * 1000;
    const newDate = new Date(PreDate.getTime() + TimeOffset);
    let Hour = newDate.getUTCHours();
    const Minute = String(newDate.getUTCMinutes()).padStart(2,"0");
    const Day = DayMap.get(newDate.getUTCDay());
    const Month = MonthMap.get(newDate.getUTCMonth());
    const Dates = newDate.getUTCDate();
    const Year = newDate.getUTCFullYear();
    let AM_PM = "";
    if(Hour >= 12){
        AM_PM = "PM";
        if(Hour > 12){
            Hour -= 12;
        }
    }
    else{
        AM_PM = "AM";
    }
    let Night = false;
    if(Hour >= 6 && AM_PM === "PM"){
        Night = true;
    }
    if(Hour <=6 && AM_PM === "AM"){
        Night = true;
    } 
    const TimeData = {
        Years:Year,
        Number:Dates,
        Hours:Hour,
        Minutes:Minute,
        Days:Day,
        Months:Month,
        DayTime:AM_PM,
        NightorNot:Night
    }
    return TimeData;
    }
    function LocationFinder(Latitude,Longitude){
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=1fd8093fa5ff12d796d7de756cc9d6b9&units=metric`;
        fetch(URL).then((response) =>{
            if (!response.ok) {
                throw new Error(response.statusText);
            } else {
                return response.json();
            }
        }).then((data) =>{
            City.innerHTML = `${data.name}`;
        }).catch((err) =>{
            console.log(err);
        })
    }
    function LocationWeatherForecast(Latitude,Longitude){
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${Latitude}&lon=${Longitude}&appid=50c2acd53349fabd54f52b93c8650d37&units=metric`;
        LocationFinder(Latitude,Longitude);
        fetch(URL).then((response) =>{
            if (!response.ok) {
                throw new Error(response.statusText);
            } else {
                return response.json();
            }
        }).then((data) =>{
            const TimeObject = DateandTime(data.current.dt,data.timezone_offset);
            const Nights = TimeObject.NightorNot;
            if(Nights){
                Background.style.backgroundImage = "url('./images/background-night.png')";
            }
            else{
                Background.style.backgroundImage = "url('./images/background-day.png')";
            }
            DateandTimes.innerHTML = `${TimeObject.Days}, ${TimeObject.Number} ${TimeObject.Months} ${TimeObject.Years} | ${TimeObject.Hours}:${TimeObject.Minutes} ${TimeObject.DayTime}`
            Temp.innerHTML=  `${Math.round(data.current.temp)}`;
            CTemp.innerHTML = `Feels like: ${Math.round(data.current.feels_like)}&deg C`;
            Humid.innerHTML = `Humidity: ${Math.round(data.current.humidity)}%`;
            Windy.innerHTML = `Wind: ${Math.round(data.current.wind_speed)}km/h`;
            WeatherC.innerHTML = `${data.current.weather[0].description}`;
            Icon.setAttribute("src",`./Icons/${data.current.weather[0].icon}.svg`);
            for(let i = 0; i < Image.length; i++){
                const DayObject = DateandTime(data.daily[i].dt,data.timezone_offset);
                Dayss[i].innerHTML = DayObject.Days;
                MaxMin[i].innerHTML = `${Math.round(data.daily[i].temp.min)}&deg - ${Math.round(data.daily[i].temp.max)}&deg`
                Image[i].setAttribute("src",`./Icons/${data.daily[i].weather[0].icon}.svg`);
                Describe[i].innerHTML = `${data.daily[i].weather[0].description}`
             }
        })
    }
    function GettingWeather(position){
        let Latitude = position.coords.latitude;
        let Longitude = position.coords.longitude;
        LocationWeatherForecast(Latitude,Longitude);
    }
    function ErrorinLocation(err){
        console.log(err.code);
    }
    function NameBasedWeatherSearch(Data){
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${Data}&appid=1fd8093fa5ff12d796d7de756cc9d6b9&units=metric`;
    fetch(API).then((response) =>{
        if(!response.ok){
            throw new Error(response.statusText);
        }
        else{
            return response.json();
        }
    }).then((data) =>{
      LocationWeatherForecast(data.coord.lat,data.coord.lon);
    }).catch((err) =>{
        console.log(err);
        alert(err);
    })
    }
    Location.addEventListener("click",() =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(GettingWeather,ErrorinLocation);
        } else {
            console.error("Browser doesn't support GeoLocation");
        }
    });
    Submission.addEventListener("click",() =>{
    const Value = Search.value.toLowerCase();
    NameBasedWeatherSearch(Value);
    })
    Fahernheit.addEventListener("click",() =>{
        if(Mode === 0){
        const F = Math.round((parseInt(Temp.textContent) * 1.8) + 32);
        Celsius.style.opacity = "0.8";
        Fahernheit.style.opacity = "1";
        Temp.innerHTML = F;
        Mode = 1;
    }
    });
    Celsius.addEventListener("click",() =>{
        if(Mode === 1){
        const C = Math.round((parseInt(Temp.textContent) - 32) * (5/9));
        Temp.innerHTML = C;
        Fahernheit.style.opacity = "0.8";
        Celsius.style.opacity = "1";
        Mode = 0;
    }
    })
})
const api = {
    key: "cce1b42934ebed6ab4194e804c8efb92",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  var displayCity=document.querySelector('.location .city');
  var displayTemperature=document.querySelector('.current .temp');
  var displayHighLow=document.querySelector('.current .high-low');
  var displayWeather=document.querySelector('.current .weather');
  const searchbox = document.querySelector('.search-box');
  var displayDate=document.querySelector('.location .date');
  searchbox.addEventListener('keypress', setQuery);


  var now=new Date();
  displayDate.innerHTML=dateBuilder(now);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  } 
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  
  function displayResults(weather){
      displayCity.innerHTML=weather.name+", "+weather.sys.country;
      searchbox.value="";
      displayTemperature.innerHTML=weather.main.temp+"<span>&#176;c</span>";
      displayHighLow.innerHTML=weather.main.temp_min+"&#176;c /"+weather.main.temp_max+"&#176;c";
      displayWeather.innerHTML=weather.weather[0].main;
  }


  function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day}, ${month} ${date} ${year}`;  
  }
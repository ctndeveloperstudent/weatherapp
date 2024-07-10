//City and Temperature Functionality
function refreshWeather(response) {

  console.log(response.data.condition.icon_url);

  let temperatureElement = document.querySelector("#temperature") //Locate big temp on page
  let temperature = response.data.temperature.current; //inject big temp api
  let cityElement = document.querySelector("#city"); //locate city on page
  let descriptionElement = document.querySelector("#description"); //locate temp description on page
  let description = response.data.condition.description; //inject description from api
  let feelsLikeElement = document.querySelector("#temp-feels-like"); //locate feels like on page
  let feelsLike = response.data.temperature.feels_like; //inject feels like api
  let mainDayElement = document.querySelector("#main-day");
  let mainDateDayElement= document.querySelector("#main-day-date")
  let mainMonthElement = document.querySelector("#main-month");
  let mainHourElement = document.querySelector("#main-hour");
  let mainMinuteElement = document.querySelector("#main-minutes");

  
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //Array of day names
  let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  //extract the date and time
  let unixTimestamp = response.data.time; //extract the time property
  let date = new Date(unixTimestamp * 1000); //convert to milliseconds
  let dayIndex = date.getDay(); //convert to day
  let dayName = daysOfWeek[dayIndex];
  let day = date.getDate().toString().padStart(2, '0'); //convert to day number
  let monthIndex = date.getMonth(); //extract month as number
  let monthName = months[monthIndex];
  let hour = date.getHours().toString().padStart(2, '0'); //convert to hours
  let minutes = date.getMinutes().toString().padStart(2, '0'); //convert to minutes
  
  

  console.log(minutes);
  mainMinuteElement.innerHTML = minutes;
  mainHourElement.innerHTML = hour;
  mainMonthElement.innerHTML = monthName;
  mainDateDayElement.innerHTML = day;
  mainDayElement.innerHTML = dayName;
  feelsLikeElement.innerHTML = Math.round(feelsLike); //round feels like number
  cityElement.innerHTML = response.data.city; //inject city name from api
  descriptionElement.innerHTML = description.split(' ') //inject description and capitalise each word
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  temperatureElement.innerHTML = Math.round(temperature); //round up big temp
}

//Api Key and Url
function searchCity(city){
  let apiKey = "1bf7247e8oed094td2f47e3a13b3fa79"; //Separation of concerns
  let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}



//Search Engine Functionality
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Town Hall")



/*
//change from celcius to f
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);*/

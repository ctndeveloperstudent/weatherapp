//City and Temperature Functionality
function refreshWeather(response) {

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
  let iconElement = document.querySelector("#icon");

  
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //Array of day names
  let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  //extract the date and time
  let date = new Date(response.data.time * 1000); //convert to milliseconds
  let dayIndex = date.getDay(); //convert to day
  let dayName = daysOfWeek[dayIndex];
  let day = date.getDate().toString().padStart(2, '0'); //convert to day number
  let monthIndex = date.getMonth(); //extract month as number
  let monthName = months[monthIndex];
  let hour = date.getHours().toString().padStart(2, '0'); //convert to hours
  let minutes = date.getMinutes().toString().padStart(2, '0'); //convert to minutes
  
  
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
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

  getForecast(response.data.city);
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

//Get forecast function
function getForecast(city){
  let apiKey = "1bf7247e8oed094td2f47e3a13b3fa79";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//Acquire days of the week for the weekly forcast
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days =["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

//Display forecast function
function displayForecast(response){
  console.log(response.data)

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 7) {
    forecastHtml = 
      forecastHtml +
      `
      <div class="col-2">
          <ul>
              <li class="weeklytimemini">
                  ${formatDay(day.time)}
              </li>
              <li>
                  <img src="${day.condition.icon_url}" class="weeklyiconmini"/>
              </li>
              <li class="weeklytempmini">
                  ${Math.round(day.temperature.maximum)}°
              </li>
          </ul>
      </div>
    `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let forecastElement = document.querySelector("#forecast");
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");


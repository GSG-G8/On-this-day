let lat = 31.5;
let lon = 34.5;
const weatherInfo = data => {
  const header = document.querySelector(".header__weather");
  const city = document.createElement("h1");
  city.textContent = data.name;
  header.appendChild(city);

  const descriptin = document.createElement("h1");
  descriptin.textContent = data.weather[0].description;
  header.appendChild(descriptin);

  const temp = document.createElement("h1");
  temp.textContent = data.main.temp + "℃";
  header.appendChild(temp);
};
const urlweather =
  "https://api.openweathermap.org/data/2.5/weather?lat=31.5&lon=34.5&appid=795a73f80e1447a92a70669a7c739689&units=metric";

xhr(urlweather, weatherInfo);

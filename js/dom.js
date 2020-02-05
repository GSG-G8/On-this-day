const eventContainer = document.querySelector(".container__events");
const header = document.querySelector(".header__weather");
const dateToSearch = document.getElementById("date");
let historyUrl = `https://cors-anywhere.herokuapp.com/history.muffinlabs.com/date`;
let lat = 31.5;
let lon = 34.5;
window.onload = document.querySelector(".container__input").focus();
const activities = document.getElementById("filterByCategory");

//weather information
const weatherInfo = data => {
  const city = document.createElement("h1");
  city.textContent = data.name;
  header.appendChild(city);
  const descriptin = document.createElement("h1");
  descriptin.textContent = data.weather[0].description;
  header.appendChild(descriptin);

  const temp = document.createElement("h1");
  temp.textContent = Math.round(data.main.temp) + "℃";
  header.appendChild(temp);
};
const urlweather =
  "https://api.openweathermap.org/data/2.5/weather?lat=31.5&lon=34.5&appid=795a73f80e1447a92a70669a7c739689&units=metric";

xhr(urlweather, weatherInfo);

dateToSearch.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    eventContainer.textContent = "";
    historyUrl = `https://cors-anywhere.herokuapp.com/history.muffinlabs.com/date/${dateToSearch.value}`;
    xhr(historyUrl, getData);
  }
});

xhr(historyUrl, data => show(data.data.Events));

activities.addEventListener("click", () => {
  const options = activities.querySelectorAll("option");
  const count = options.length;
  if (typeof count === "undefined" || count < 2) {
    xhr(historyUrl, historyInfo);
  }
});

activities.addEventListener("change", () => {
  if (activities.value == "events") {
    xhr(historyUrl, data => show(data.data.Events));
  } else if (activities.value == "born") {
    xhr(historyUrl, data => show(data.data.Births));
  } else if (activities.value == "died") {
    xhr(historyUrl, data => show(data.data.Deaths));
  } else {
    xhr(historyUrl, historyInfo);
  }
});

const cleardate = myNode => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};

const show = arr => {
  cleardate(eventContainer);
  for (let i = arr.length - 1; i >= 0; i--) {
    let event = document.createElement("li");
    event.className = "container__events__li";
    eventContainer.appendChild(event);
    let year = document.createElement("i");
    year.className = "container__events__year";
    let details = document.createElement("p");
    details.className = "container__events__details";
    let eventLink = document.createElement("a");
    eventLink.classList.add("event__link");
    eventLink.target = "_blank";
    eventLink.href = arr[i].links[0].link;

    event.appendChild(year);
    event.appendChild(details);
    event.appendChild(eventLink);

    year.textContent = arr[i].year;
    details.textContent = arr[i].text;
    eventLink.textContent = "For more details";
  }
};

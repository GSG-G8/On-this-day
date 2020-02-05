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

//on this day information
const getData = data => {
  cleardate(eventContainer);
  show("Events", data);
};

dateToSearch.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    eventContainer.textContent = "";
    historyUrl = `https://cors-anywhere.herokuapp.com/history.muffinlabs.com/date/${dateToSearch.value}`;
    xhr(historyUrl, getData);
  }
});

xhr(historyUrl, getData);

activities.addEventListener("click", () => {
  const options = activities.querySelectorAll("option");
  const count = options.length;
  if (typeof count === "undefined" || count < 2) {
    xhr(historyUrl, historyInfo);
  }
});

activities.addEventListener("change", () => {
  if (activities.value == "events") {
    xhr(historyUrl, showEvents);
  } else if (activities.value == "born") {
    xhr(historyUrl, showborn);
  } else if (activities.value == "died") {
    xhr(historyUrl, showdied);
  } else {
    xhr(historyUrl, historyInfo);
  }
});

const showEvents = data => {
  cleardate(eventContainer);
  show("Events", data);
};

const showborn = data => {
  cleardate(eventContainer);
  show("Births", data);
};

const showdied = data => {
  cleardate(eventContainer);
  show("Deaths", data);
};

const cleardate = myNode => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};

const show = (option, data) => {
  cleardate(eventContainer);
  for (let i = data.data[option].length - 1; i >= 0; i--) {
    let event = document.createElement("li");
    event.className = "container__events__li";
    eventContainer.appendChild(event);
    let year = document.createElement("i");
    year.className = "container__events__year";
    let details = document.createElement("p");
    details.className = "container__events__details";
    let eventLink = document.createElement("a");
    eventLink.target = "_blank";
    eventLink.href = data.data[option][i].links[0].link;

    event.appendChild(year);
    event.appendChild(details);
    event.appendChild(eventLink);

    year.textContent = data.data[option][i].year;
    details.textContent = data.data[option][i].text;
    eventLink.textContent = "For more details";
  }
};

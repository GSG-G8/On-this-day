const activities = document.getElementById("filterByCategory");

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
  showoption("Events", data);
};

const showborn = data => {
  cleardate(eventContainer);
  showoption("Births", data);
};
const showdied = data => {
  cleardate(eventContainer);
  showoption("Deaths", data);
};

const cleardate = myNode => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};

const showoption = (option, data) => {
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

xhr(historyUrl, showEvents);

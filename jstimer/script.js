let timer = null;
let timerValue = 0;
let isRunning = false;

let btnStart = null;
let btnStop = null;
let btnLap = null;
let timerText = null;
let lapContainer = null;

(function () {
  window.onload = function () {
    btnStart = document.getElementById("start");
    btnStop = document.getElementById("stop");
    btnLap = document.getElementById("lap");
    timerText = document.getElementById("timerContent");
    lapContainer = document.getElementById("laps");
  };
})();

/*
 * Utility functions
 */

function makeInactive(...btns) {
  btns.forEach((item) => {
    item.disabled = true;
  });
}

function makeActive(...btns) {
  btns.forEach((item) => {
    item.disabled = false;
  });
}

/*
 * Timer calculation function
 */

function stringifyTime(s) {
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

/*
 * Button handlers
 */

function swapStart() {
  if (isRunning) {
    btnStart.firstChild.data = "Start";
    btnStart.style.backgroundColor = "green";
    isRunning = !isRunning;
  } else {
    btnStart.firstChild.data = "Pause";
    btnStart.style.backgroundColor = "orange";
    isRunning = !isRunning;
  }
}

function startHandler() {
  makeActive(btnStop, btnLap);
  swapStart();
  if (isRunning) {
    timer = setInterval(() => {
      timerValue += 9;
      document.getElementById("timerContent").innerHTML = stringifyTime(timerValue);
    }, 9);
  } else {
    clearInterval(timer);
  }
  console.log("Start pressed!");
}

function stopHandler() {
  clearInterval(timer);
  timerValue = 0;
  isRunning = true;
  swapStart();
  document.getElementById("timerContent").innerHTML = stringifyTime(timerValue);
  while(document.getElementById("stamp")) {
    document.getElementById("stamp").remove();
  }
  makeInactive(btnStop, btnLap);
  console.log("Stop pressed!");
}

function lapHandler() {
  let lapSpan = document.createElement("p");
  let timeStamp = document.createTextNode(stringifyTime(timerValue));
  lapSpan.appendChild(timeStamp);
  lapSpan.setAttribute("id", "stamp");
  lapContainer.appendChild(lapSpan);
  console.log("Lap pressed!");
}

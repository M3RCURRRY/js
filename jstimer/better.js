let TICKRATE = 17;

function toggleHandler() {
  if (advTimer.value && advTimer.isPaused) { // Has value & paused
    advTimer.state = 2;
    advTimer.startTimer();
  }
  else if (!advTimer.value) { // No value & not started
    advTimer.startTimer();
  }
  else if (!advTimer.isPaused) { // Has value & running
    advTimer.stopTimer();
  }
}

function lapHandler() {
  if (advTimer.value && advTimer.isPaused) {
    advTimer.state = 1;
    advTimer.resetTimer();
  }
  else if (!advTimer.isPaused) {
    domEditor.makeLap();
  }
  else {
    console.log("Lap is inactive");
  }
}

let advTimer = {
  /*
  State codes:
  1 - State init
  2 - State run
  3 - State pause
  */
  state: 1,
  value: 0,
  lts: 0,
  isPaused: true,
  timer: null,

  startTimer() {
    this.isPaused = false;
    this.state = 2;
    this.lts = Date.now();
    this.timer = setInterval(() => {
      this.value += (Date.now() - this.lts);
      this.lts = Date.now();
    }, TICKRATE);
  },

  stopTimer() {
    clearInterval(this.timer);
    this.isPaused = true;
    this.state = 3;
    console.log("stopTimer called");
  },

  resetTimer() {
    this.value = 0;
    this.state = 1;
    console.log("resetTimer called");
  },
}

//
// DOM Editor
//

let domEditor = {
  updater: null,
  state: 1,

  timeToString(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    return `${hrs}`.padStart(2, '0') + ':' + `${mins}`.padStart(2, '0') + ':' + 
    `${secs}`.padStart(2, '0') + '.' + `${ms}`.padStart(3, '0');
  },

  startResolver() {
    this.updater = setInterval(() => {
      switch(advTimer.state) {
        case 1:
          document.getElementById("timerId").innerHTML = this.timeToString(advTimer.value);
          this.toStateInit();
          break;
        case 2:
          document.getElementById("timerId").innerHTML = this.timeToString(advTimer.value);
          this.toStateRunning();
          break;
        case 3:
          this.toStatePaused();
          break;
        default:
          console.log('Как так-то???');
          break;
      }
    }, TICKRATE);
  },

  toStateInit: () => {
    document.getElementById("lapId").disabled = true;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";

    while (document.getElementById("stamp")) {
      document.getElementById("stamp").remove();
    }
  },

  toStatePaused: () => {
    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").firstChild.data = "Reset";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";
  },

  toStateRunning: () => {
    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Stop";

    document.getElementById("toggleId").style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  },

  makeLap() {
    let lapPar = document.createElement("p");
    let timeStamp = document.createTextNode(this.timeToString(advTimer.value));
    lapPar.appendChild(timeStamp);
    lapPar.setAttribute("id", "stamp");
    document.getElementById("lapsContainer").appendChild(lapPar);
    console.log("makeLap called");
  }
}

domEditor.startResolver();
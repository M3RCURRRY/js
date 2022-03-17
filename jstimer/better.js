function toggleHandler() {
  if (advTimer.value && advTimer.isPaused) { // Has value & paused
    advTimer.state = 2;
    advTimer.startTimer();
  }
  else if (!advTimer.value) { // No value & not started
    advTimer.state = 2;
    advTimer.startTimer();
  }
  else if (!advTimer.isPaused) { // Has value & running
    advTimer.state = 3;
    advTimer.stopTimer();
  }
}

function lapHandler() {
  if (advTimer.value && advTimer.isPaused) {
    advTimer.state = 1;
    advTimer.resetTimer();
  }
  else if (!advTimer.isPaused) {
    advTimer.makeLap();
  }
  else {
    console.log("Lap is inactive");
  }
}

let advTimer = {
  state: 1,
  value: 0,
  lts: 0,
  isPaused: true,
  timer: null,

  // Time Converter
  stringifyTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    return `${hrs}`.padStart(2, '0') + ':' + `${mins}`.padStart(2, '0') + ':' + 
    `${secs}`.padStart(2, '0') + '.' + `${ms}`.padStart(3, '0');
  },

  // State Handlers

  toStateInit: () => {
    document.getElementById("lapId").disabled = true;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";
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

  // Button Handlers

  startTimer() {
    this.isPaused = false;
    this.toStateRunning();
    this.lts = Date.now();
    this.timer = setInterval(() => {
      document.getElementById("timerId").innerHTML = this.stringifyTime(this.value);
      this.value += (Date.now() - this.lts);
      console.log(this.value);
      this.lts = Date.now();
    }, 17);
  },

  stopTimer() {
    clearInterval(this.timer);
    this.isPaused = true;
    this.toStatePaused();
    console.log("stopTimer called");
  },

  resetTimer() {
    this.value = 0;
    document.getElementById("timerId").innerHTML = this.stringifyTime(this.value);
    this.toStateInit();
    while (document.getElementById("stamp")) {
      document.getElementById("stamp").remove();
    }
    console.log("resetTimer called");
  },

  makeLap() {
    let lapPar = document.createElement("p");
    let timeStamp = document.createTextNode(this.stringifyTime(this.value));
    lapPar.appendChild(timeStamp);
    lapPar.setAttribute("id", "stamp");
    document.getElementById("lapsContainer").appendChild(lapPar);
    console.log("makeLap called");
  }
}

/*
 State codes:
 1 - State init
 2 - State run
 3 - State pause

 State Init :
 - Inactive Lap
 - Active Start

 State Running :
 - Active Lap
 - Active Stop

 State Paused :
 - Active Reset
 - Active Start
 */
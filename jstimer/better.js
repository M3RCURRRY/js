const TICKRATE = 17;
const STATE_INIT = 1;
const STATE_RUNNING = 2;
const STATE_PAUSED = 3; 

let advTimer = {
  state: STATE_INIT,
  value: 0,
  lts: 0,
  isPaused: true,
  timer: null,
  laps: [0],
  stamps: [0],

  startTimer() {
    this.isPaused = false;
    this.state = STATE_RUNNING;
    this.lts = Date.now();
    this.timer = setInterval(() => {
      this.value += (Date.now() - this.lts);
      this.lts = Date.now();
    }, TICKRATE);
  },

  pauseTimer() {
    clearInterval(this.timer);
    this.isPaused = true;
    this.state = STATE_PAUSED;
    console.log("pauseTimer called");
  },

  resetTimer() {
    this.value = 0;
    this.state = STATE_INIT;
    this.laps = [0];
    console.log("resetTimer called");
  },

  getLaps() {
    return this.laps.slice(1);
  },

  getTimestamps() {
    return this.stamps.slice(1);
  },

  createTimestamp() {
    this.laps.push(this.value - this.stamps.at(-1));
    this.stamps.push(this.value);
  }
}

//
// DOM Editor
//

let domEditor = {
  updater: null,
  mode: false,

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

  toggleHandler() {
    if ((advTimer.value && advTimer.isPaused) || (!advTimer.value)) {
      this.toStateRunning();
    }
    else if (!advTimer.isPaused) {
      this.toStatePaused();
    }
  },

  lapHandler() {
    if (advTimer.value && advTimer.isPaused) {
      this.toStateInit();
    }
    else if (!advTimer.isPaused) {
      advTimer.createTimestamp();
      this.refreshLapList();
    }
  },

  toStateInit() {
    clearInterval(this.updater);
    advTimer.resetTimer();
    document.getElementById("timerId").innerHTML = this.timeToString(advTimer.value);


    document.getElementById("lapId").disabled = true;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("lapId").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";
    this.deleteTimestamps();
  },

  toStatePaused() {
    clearInterval(this.updater);
    advTimer.pauseTimer();

    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").firstChild.data = "Reset";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";
  },

  toStateRunning() {
    clearInterval(this.updater);
    this.updater = setInterval(() => {
      document.getElementById("timerId").innerHTML = this.timeToString(advTimer.value);
    }, TICKRATE);
    advTimer.startTimer();

    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").style.backgroundColor = "rgba(85, 85, 85, 0.5)";
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Stop";

    document.getElementById("toggleId").style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  },

  deleteTimestamps() {
    while (document.getElementById("stamp")) {
      document.getElementById("stamp").remove();
    }
  },

  switchHandler(switchMode) {
    this.mode = switchMode;
    this.refreshLapList();
  },

  refreshLapList() {
    this.deleteTimestamps();
    let lapData = (this.mode === true) ? advTimer.getLaps() : advTimer.getTimestamps();
    for(let item of lapData) {
      this.makeLap(item);
    }
  },

  makeLap(value) {
    let lapPar = document.createElement("p");

    let timeStamp = document.createTextNode(this.timeToString(value));
    //let timeStamp = document.createTextNode(this.timeToString(advTimer.value));
    lapPar.appendChild(timeStamp);
    lapPar.setAttribute("id", "stamp");
    document.getElementById("lapsContainer").appendChild(lapPar);
    console.log("makeLap called");
  }
}
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
    console.log("resetTimer called");
  },
}

//
// DOM Editor
//

let domEditor = {
  updater: null,
  maksim: 1,

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
      this.makeLap();
    }
  },

  toStateInit() {
    clearInterval(this.updater);
    advTimer.resetTimer();
    document.getElementById("timerId").innerHTML = this.timeToString(advTimer.value);


    document.getElementById("lapId").disabled = true;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Start";

    document.getElementById("toggleId").style.backgroundColor = "rgba(144, 238, 144, 0.5)";

    while (document.getElementById("stamp")) {
      document.getElementById("stamp").remove();
    }
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

    if(this.maksim % 3 === 0) {
      this.makeMaxim();
    }
    this.maksim++;
    console.log(this.maksim);
  },

  makeMaxim() {
    let maximPar = document.createElement("p");
    let maximContent = document.createTextNode("🤡 я футбольный мячик 🤡");
    maximPar.appendChild(maximContent);
    maximPar.style.color = "red";
    maximPar.setAttribute("id", "stamp");
    document.getElementById("lapsContainer").appendChild(maximPar);
  }
}
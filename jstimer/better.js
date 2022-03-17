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

  // State Handlers

  toStateInit: () => {
    document.getElementById("lapId").disabled = true;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Start";
  },

  toStatePaused: () => {
    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").firstChild.data = "Reset";
    document.getElementById("toggleId").firstChild.data = "Start";
  },

  toStateRunning: () => {
    document.getElementById("lapId").disabled = false;
    document.getElementById("lapId").firstChild.data = "Lap";
    document.getElementById("toggleId").firstChild.data = "Stop";
  },

  // Button Handlers

  startTimer() {
    this.isPaused = false;
    this.toStateRunning();
    this.lts = Date.now();
    this.timer = setInterval(() => {
      document.getElementById("timerId").innerHTML = this.value;
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

  resetTimer: function() {

  },

  makeLap: function() {

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
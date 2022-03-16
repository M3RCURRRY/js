let toggleStyles = [
  ["Start", "#COLOR"], // Start button style
  ["Stop", "#COLOR"] // Stop button style
];

let lapStyles = [
  ["Lap", "#COLOR"], // Inactive lap style
  ["Lap", ""], // Active lap style
  ["Reset", ""] // Reset lap style
];

function ButtonContructor(btnRef, color) {
  this.buttonReference = btnRef;
  this.buttonColor = color;
  this.changeState = function() {
    this.buttonReference.disabled = !this.buttonReference.disabled;
  }
}


let toggleButton = ButtonContructor();
let lapButton = ButtonContructor();

let buttonStateHandler = {
  toStateInit() {
    
  }
}


let advancedTimer = {
  globalValue: 0,
  attemptValue: 0,
  state: 0,
  isTurned: false,
  isPaused: false,
  timer: null,
  startTimer: function () {
    this.state = 1;
    this.timer = setInterval(() => {
      
    }, 17);
  },
  stopTimer: function () {    
    clearInterval(this.timer);
  },
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

 State Paused : isTurned === true && isPaused === true
 - Active Reset
 - Active Start
 */
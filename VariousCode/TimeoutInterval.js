console.clear();

function funcHello() {
  console.log("Hello from func");
}

let objHello = {
  sayHello() {
    console.log("Hello from object!");
  }
};

let thisHello = {
  greeting: "Hello from local scope variable!",
  sayHello() {
    console.log(this.greeting);
  }
};

setTimeout(funcHello, 100); // Hello from func
setTimeout(objHello.sayHello, 101); // Hello from object!
setTimeout(thisHello.sayHello, 102); // undefined
setTimeout(thisHello.sayHello.bind(thisHello), 103); // Hello from local scope variable!

function helloUser(name, surname) {
  console.log(`Hello, ${name} ${surname}!`);
}

setTimeout(helloUser, 104, "Cheer", "Cash"); // Hello, Cheer Cash!

function insertedFunc() {
  return function () {
    console.log("Inserted function executed!");
  };
}

setTimeout(insertedFunc(), 105); // Inserted function executed!

function func2clear() {
  console.log("Testing clearTimeout!");
}

let timer1 = setTimeout(func2clear, 106);
let timer2 = setTimeout(func2clear, 107);
clearTimeout(timer2); // "Testing clearTimeout!" (only 1 time)

function func2interval() {
  console.log("Testing setInterval");
}

/*
let interval = setInterval(func2interval, 1000);
setTimeout(() => {
  clearInterval(interval);
  alert("stop");
}, 5000);
*/

let interval = null;
let N = 3000;
let M = 5000;

setTimeout(() => interval = setInterval(func2interval, 1000), N);
setTimeout(() => clearInterval(interval), N+M);
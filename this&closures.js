// ----------------
// this + Closures
// ----------------

//
// this
//

function Animal(name) {
  this.name = name;
}

function Bark() {
  this.bark = this.name;
}

let wolf = new Animal("wolf");
console.log(wolf.name); // undefined

wolf = new Bark();
console.log(wolf.name); // undefined
console.log(wolf.bark); // undefined

function getName() {
  return this.name;
}

console.log(getName()); // JSFiddle = "result" (???), в консоли ''

let obj = {
  name: "Grisha",
};

obj.getObjName = getName;
console.log(obj.getObjName()); // Grisha

let method = obj.getObjName;

console.log(method()); // '' (name берётся из window)

//
// Closures
//

function func() {
  let phrase = "Hello!";

  const foonc = function () {
    console.log(phrase);
  };

  phrase = "Salam!";

  return foonc;
}

console.log(func()); // f () { ... }
func()(); // "Salam!"

function multiply(m, n) {
  return function () {
    console.log(n * m);
  };
}

console.log(multiply(2, 3)); // f () { ... }
const m = multiply(2, 3);
m(); // 6

function makeShout(langShout) {
  return function(username) {
    return langShout + ", " + username;
  }
}

const russian = makeShout("Privet");
const english = makeShout("Hello");

console.log(russian("Ivan")); // "Privet, Ivan"
console.log(english("John")); // "Hello, John"

function urlResolver(urlDomain) {
  return function(url) {
    return `https://${url}.${urlDomain}`;
  }
}

const ruResolver = urlResolver("ru");
const comResolver = urlResolver("com");

console.log(ruResolver("yandex")); // https://yandex.ru
console.log(comResolver("google")); // https://google.com
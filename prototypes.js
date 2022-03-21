console.clear();
let user = {
  username: "default-username",
  password: "default-password",
};

let admin = Object();

Object.setPrototypeOf(admin, user);

console.log(admin.username); // default-username
console.log(admin.password); // default-password

admin.username = "admin";
admin.password = "root";

console.log(admin.username); // admin
console.log(admin.password); // root
console.log(user.username); // default-username
console.log(user.password); // default-password

console.log(admin.__proto__); // {username: "default-user", password: "default-password"}
console.log(user.__proto__); // {}
console.log(Object.getPrototypeOf(user)); // {}

console.log(admin.__proto__ === Object.getPrototypeOf(admin)); // true
console.log(Object.getPrototypeOf(admin) === user); // true
console.log(Object.getPrototypeOf(user) == {}); // false
console.log(user.__proto__ == {}); // false

let parentObject = {
  data: "123",
};

let childObject = Object.assign({}, parentObject);

console.log(Object.getPrototypeOf(childObject) == parentObject); // false
console.log(childObject.__proto__); // {}

let car = {
  isBroken: false,
  beep() {
    return "beep-beep";
  },
};

let bemewe = {
  drive() {
    this.isBroken = true;
    return "Mi na STO";
  },
};

Object.setPrototypeOf(bemewe, car);
console.log(bemewe.drive()); // Mi na STO
console.log(bemewe.isBroken); // true

let vedroved = {
  drive() {
    this.isBroken = true;
    return "Toje na STO";
  },
};

vedroved.__proto__ = car;
console.log(vedroved.drive()); // Toje na STO;
console.log(vedroved.isBroken); // true;

let signal = {
  sig: "Beep!",
};

let emptySignal = {
  callSignal() {
    return this.sig;
  },
};

Object.setPrototypeOf(emptySignal, signal);
console.log(emptySignal.callSignal()); // Beep!

let keys = {
  keyOne: 1,
  keyTwo: 2,
};

let moreKeys = {
  keyThree: 3,
  keyFour: 4,
};

Object.setPrototypeOf(moreKeys, keys);
console.log(Object.keys(moreKeys)); // [keyThree, keyFour]
for (let k in moreKeys) {
  console.log(k); // Three, Four, One, Two;
}

let protoKeys = {
  __proto__: keys,
  keyThree: 3,
  keyFour: 4,
};

for (let k in protoKeys) {
  console.log(k); // Three Four One Two
}

let animal = {
  walk: true,
};

function Cheetah() {
  this.run = true;
  this.jump = true;
  this.kusat = true;
}

Cheetah.prototype = animal;

let gepard = new Cheetah();
console.log(gepard.walk); // true

function Bear() {
  this.prototype = animal;
  this.kusat = true;
  this.spat = true;
}

let medved = new Bear();
console.log(medved.walk); // undefined

function NormalniyBear() {
  this.__proto__ = animal;
  this.kusat = true;
  this.spat = true;
}

let goodMedved = new NormalniyBear();
console.log(goodMedved.walk); // true

let a = [1, 2, 3];
console.log(a.__proto__ === Array.prototype); // true
console.log(a.__proto__.__proto__ === Object.prototype); // true
console.log(a.__proto__.__proto__ === Array.__proto__); // false
console.log(a.__proto__.__proto__ === Array.prototype.__proto__); // true;

let message = {
  0: "Greetings,",
  1: "Victor",
  2: "Dudka",
};

message.join = Array.prototype.join;
console.log(message.join(" ")); // ""

message.length = 3;
console.log(message.join(" ")); // "Greetings, Victor Dudka"

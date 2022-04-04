console.clear();

class MyArray extends Array {
  size() {
    return this.length;
  }

  static get [Symbol.species]() {
    return Array;
  }
}

// MyArray methods
let arr = new MyArray(1, 2, 3, 4, 5);
console.log(arr.size()); // 5

// Array methods
arr.map((item) => {
  console.log(item); // 1, 2, 3, 4, 5
});

let newarr = arr.filter((item) => {
  return item > 0;
});
console.log(newarr); //1,2,3,4,5
console.log(Array.isArray(newarr)); // true
//console.log(newarr.size()); // size is not a function

console.log(MyArray instanceof Array); // false
console.log(Object.getPrototypeOf(arr) === MyArray.prototype); // true
console.log(Object.getPrototypeOf(arr) === Array.prototype); // false
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
console.log(arr instanceof MyArray); // true;
console.log();

class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.isAnimal) {
      return true;
    }
  }
}

let rabbit = {
  isAnimal: true
};
console.log(rabbit instanceof Animal); // true;

let shittyObj = {
  makeBark() {
    console.log("gav gav gav");
  },

  makeSleep() {
    console.log("Z-z-Z");
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Dog.prototype, shittyObj);

new Dog("Sobaken").makeBark(); // gav gav gav

class AnotherDog extends Dog {
  constructor(name) {
    super(name);
  }
}

new AnotherDog("Pyos").makeSleep();

let turboPrimesi = {
  // Или __proto__: shittyObj,
  makeRaketa() {
    console.log("Viiiiiiiy");
  }
};

Object.setPrototypeOf(turboPrimesi, shittyObj);
console.log(turboPrimesi); // raketa, bark, sleep;

Object.assign(AnotherDog, turboPrimesi);
new AnotherDog.makeRaketa(); // Viiiiiiiy

class FirstClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

class SecondClass extends FirstClass {
  constructor(name, surname) {
    super(name);
    this.surname = surname;
  }

  printData() {
    return this.name + " " + this.surname;
  }
}

class ThirdClass extends SecondClass {
  constructor(name, surname) {
    super(name, surname);
    this.name = name;
    this.surname = surname;
  }

  sayHi() {
    return `Hi, ${this.name} ${this.surname}!`;
  }
}

let classSample = new ThirdClass("Name", "Surname");
console.log(classSample.sayHi()); // Hi, Name Surname!
console.log(classSample.sayName()); // Name
console.log(classSample.printData()); // Name Surname

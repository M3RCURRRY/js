function sayHi(name) {
  return `Hello, ${name}`;
}

function sayHiDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      console.log(`Got from cache for ${x}`);
      return cache.get(x);
    } else {
      console.log(`Calculated by function for ${x}`);
      let result = func(x);
      cache.set(x, result);
      return result;
    }
  };
}

sayHi = sayHiDecorator(sayHi);

console.clear();

let v1 = sayHi("Alex"); // Calculated by function for Alex
let v2 = sayHi("Victor"); // Calculated by function for Victor
let v3 = sayHi("Alex"); // Got from cache for Alex

console.log(`First : ${v1}\nSecond : ${v2}\nThird : ${v3}`);

/*
 * Call / apply
 */

let yaObject = {
  isOnline: false,
  generatePhrase() {
    this.isOnline = !this.isOnline;
    return this.isOnline ? "Hi, " : "Bye, ";
  },
  greeting(name) {
    return this.generatePhrase() + name;
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}

console.log(yaObject.greeting("Victor")); // Hi, Victor
yaObject.greeting = cachingDecorator(yaObject.greeting);
//console.log(yaObject.greeting("Andrey")); // generatePhrase - undefined

// Создадим другой
let yaObject1 = {
  isOnline: false,
  generatePhrase() {
    this.isOnline = !this.isOnline;
    return this.isOnline ? "Hi, " : "Bye, ";
  },
  greeting(name) {
    return this.generatePhrase() + name;
  }
};

function correctDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(yaObject1, x);
    cache.set(x, result);
    return result;
  };
}

yaObject1.greeting = correctDecorator(yaObject1.greeting);
console.log(yaObject1.greeting("Andrey")); // Hi, Andrey

let contextObj = {
  name: "Username",
  sayHi(n) {
    return "Hi, " + this.name;
  }
};

let name = "Podliva";
let foo = contextObj.sayHi; // Теряем this

//console.log(foo()); // name - undefined

let callWrapper = function () {
  return foo.apply(contextObj, arguments);
};

console.log(callWrapper()); // Hi, username

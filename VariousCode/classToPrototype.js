console.clear();

class ParentClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

let user = new ParentClass("Username");

console.log(ParentClass); // function ParentClass() {}
console.log(typeof ParentClass); // function
console.log(user); // ParentClass {...}
console.log(ParentClass.prototype); // { sayBye : f }
console.log(ParentClass.__proto__); // f ()
console.log(ParentClass === ParentClass.prototype.constructor); // true
console.log(Object.getOwnPropertyDescriptors(ParentClass.prototype)); // constructor, sayName

ParentClass.prototype.sayBye = function () {
  return `Bye, ${this.name}`;
};
ParentClass.sayHi = function () {
  return `Hi, ${this.name}`;
};

let user1 = new ParentClass("New User");

console.log(user1.sayHi); // undefined
console.log(Object.getOwnPropertyDescriptor(ParentClass.prototype, "sayBye")); // f() , true, true, true
console.log(Object.getOwnPropertyDescriptor(ParentClass.prototype, "sayHi")); // undefined
console.log(Object.getOwnPropertyNames(ParentClass.prototype)); // constructor, sayName, sayBye
console.log(user1 instanceof ParentClass); // true

function createClass(str) {
  return class {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      return str;
    }
    sayName() {
      return this.name;
    }
  };
}

let NewUser = createClass("Hello");
console.log(new NewUser()); // class
console.log(NewUser); // function _class() {}
console.log(new NewUser().sayHi()); // Hello
console.log(new NewUser("Username").sayName()); // Username

class Test {
  constructor(name) {
    this.name = name;
  }
}

Object.defineProperties(Test.prototype, {
  weight: {
    set(value) {
      this._weight = value;
    },
    get() {
      return this._weight;
    }
  }
});

let person1 = new Test("Name", "Surname");

person1.weight = 75;
console.log(person1.weight); // 75

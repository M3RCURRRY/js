console.clear();

class MyClass {
  constructor(className) {
    this.name = className;
  }

  myMethod() {
    return this.name;
  }
}

let classObject = new MyClass("testName");
console.log(classObject.myMethod()); // testName

console.log(typeof classObject); // object
console.log(typeof MyClass); // function
console.log(MyClass); // class MyClass { ... }

for (let i in classObject) {
  console.log(i); // name
}

let classCreator = function (par) {
  return class {
    constructor(par) {
      this.variable = par;
    }

    someMethod() {
      return this.variable;
    }
  };
};

let created = classCreator();
console.log(new created("name").someMethod()); // name
console.log(created.name); // _class ???

class GetSetClass {
  constructor(value) {
    this.MyValue = value;
  }

  get value() {
    return this.MyValue;
  }

  set value(v) {
    this.MyValue = v;
  }
}

let getSet = new GetSetClass(10);
console.log(getSet.value); // 10
getSet.value = 11;
console.log(getSet.value); // 11
console.log(getSet.MyValue); // 11

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    return `${this.name} валит со скоростью ${this.speed} км/ч`;
  }
  stop() {
    this.speed = 0;
    return `${this.name} припарковался`;
  }
}

class Wolf extends Animal {
  viiiiiy() {
    return `${this.name} начал выть`;
  }
}

class Rabbit extends Animal {
  hide() {
    return `${this.name} шкерится`;
  }

  stop() {
    return `${super.stop()}. ${this.hide()}.`;
  }
}

let rabbit = new Rabbit("Крол");
console.log(rabbit.run(199)); // Валит
console.log(rabbit.stop()); // Припарковался и шкерится

let wolf = new Wolf("Волчара");
console.log(wolf.run(11)); // Валит
console.log(wolf.stop()); // Припарковался
console.log(wolf.viiiiiy()); // Начал выть

class ParentClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

class ChildClass extends ParentClass {
  constructor(name, surname) {
    super();
    this.name = name + "123";
    this.surname = surname;
  }
}

let childClass = new ChildClass("TestName", "TestSurname");
console.log(childClass.sayName()); // TestName123 (как я понял, "прокидывается" this)

class ProtectedClass {
  constructor(value) {
    this._value = value;
  }

  getValue() {
    return this._value;
  }

  get value() {
    return this._value;
  }
}

let protectedClass = new ProtectedClass("variable");
console.log(protectedClass._value); // variable
console.log(protectedClass.value); // variable

class PrivateClass {
  #value = 0;
  constructor(value) {
    //this.#value = value; // Must be deaclared in an enclosing class
    this.#value = value;
  }
  
  get value() {
    return this.#value;
  }
}

let privateClass = new PrivateClass("privateVariable");
console.log(privateClass.value); // privateVariable
//console.log(privateClass.#value); // undefined

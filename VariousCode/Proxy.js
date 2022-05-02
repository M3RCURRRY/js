console.clear();

let target = {};
let proxy = new Proxy(target, {});

proxy.test = 5;
console.log(target.test); // 5
console.log(proxy.test); // 5

for (let key in proxy) {
  console.log(key); // test
}

//
// Getьман
//

let numbers = [1, 2, 3];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return "НЕТ ТАКОГО!";
    }
  },
});

console.log(numbers[1]); // 1
console.log(numbers[123]); // НЕТ ТАКОГО!

//
// Set (Validation чи шо)
//

let setNums = [];

setNums = new Proxy(numbers, {
  set(target, prop, val) {
    if (typeof val == "number") {
      target[prop] = val;
      return true; // Если убрать - получим TypeError
    } else {
      console.log("КУДА ПИХАЕШЬ?!");
      return false;
    }
  },
});

console.log(setNums.push(1)); // true (успешно)
console.log(setNums.push(2)); // true (успешно)
console.log(setNums.length); // 2
//setNums.push("hui"); // КУДА ПИХАЕШЬ?! (ниже код не выполнится из-за срабатывания ловушки)

let user = {
  name: "John",
  age: 30,
  _password: "passwd",
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value;
    }
  },
  
  set(target, prop, val) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },

  ownKeys(target) {
    return Object.keys(target).filter((key) => {
      !key.startsWith("_");
    });
  },

  getOwnPropertyDescriptor(target, prop) {
    return {
      enumerable: true,
      configurable: true
    };
  },

  deleteProperty(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
});

for (let key in user) {
  console.log(key); // name, age
}

// get Refused
try {
  console.log(user._password);
} catch(e) { 
  console.log(`On get ${e.message}`); // On get Error: Access denied
}

// set Refused
try {
  user._password = "varvarvar";
} catch(e) {
  console.log(`On set ${e.message}`); // On set Error: Access denied
}

// delete Refused
try {
  delete user._password;
} catch(e) { 
  console.log(`On delete ${e.message}`); // On delete Error: Access denied
}

//
// Reflect
//

// Reflect set
let userData = {};
Reflect.set(userData, 'name', 'Alex');
console.log(userData.name); // Alex

userData = new Proxy(user, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // Alex
user.name = "Grisha"; // теперь он у нас Гриша

let defaultUser = {
  _name: "User",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver -> admin
    return Reflect.get(target, prop, receiver);
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Administrator"
};

console.log(admin.name); // Administrator
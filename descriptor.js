console.clear();

let user = {
  id: 12,
  username: "John",
  password: "johnroot"
};

Object.defineProperty(user, "id", {
  value: 11
});
let userDescriptor = Object.getOwnPropertyDescriptor(user, "id");
console.log(JSON.stringify(userDescriptor, null, 2)); // value 11

Object.defineProperty(user, "id", {
  writable: false
});

//user.id = 123; // read-only TypeError

Object.defineProperty(user, "newProp", {
  value: "test",
  enumerable: true,
  configurable: true
});

userDescriptor = Object.getOwnPropertyDescriptor(user, "newProp");
console.log(JSON.stringify(userDescriptor, null, 2)); // writable: false

Object.defineProperty(user, "password", {
  enumerable: false
});
for (let prop in user) {
  console.log(prop); //no password in output
}

Object.defineProperty(user, "constValue", {
  value: 3.14,
  configurable: false // by default
});

console.log(user.constValue);

Object.defineProperty(user, "constValue", {
  value: 3.14,
  configurable: false // by default
});

let obj = {
  one: 1,
  two: 22,
  three: 333
};

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

console.clear();

let obj = {
  name: "Alex",
  surname: "Dickson",
  age: 30,
  get userName() {
    return `${this.name} ${this.surname}`;
  },
  set userAge(propAge) {
    this.age = propAge;
  }
};

console.log(obj.userName); // Alex Dickson
//console.log(obj.userName()); // is not a function
obj.userAge = 31;
console.log(obj.age); // 31

Object.defineProperty(obj, "userName", {
  get() {
    return `My name is : ${this.name} ${this.surname}`;
  }
});

console.log(obj.userName);

Object.defineProperty(obj, "userAge", {
  set(val) {
    this.age = val * 2;
  }
});

obj.userAge = 100;
console.log(obj.age);

// ------------------
// WeakMap & WeakSet
// ------------------

// WeakMap

function CreateData(country, age, perms) {
  return {
    country: country,
    age: age,
    perms: perms,
  };
}

let weakMap = new WeakMap();

let user1 = { name: "Daniel" };
let user2 = { name: "Viktor" };
let user3 = { name: "Chyort" };

weakMap.set(user1, CreateData("Denmark", 30, true));
weakMap.set(user2, CreateData("Thailand", 24, false));
weakMap.set(user3, CreateData("Israel", 33, true));

console.log(weakMap.get(user1));

// WeakSet

let weakSet = new WeakSet();

let john = { name: "John" };
let mary = { name: "Mary" };
let alex = { name: "Alex" };

weakSet.add(john);
weakSet.add(mary);
weakSet.add(alex);

john = null;

console.log(weakSet.has(mary)); // true
console.log(weakSet.has(john)); // false

let wSet = new WeakSet();

let msg1 = {
  content: "Call",
  author: "John",
};

wSet.add(msg1);

let msg2 = {
  content: "Reply",
  author: "Alex",
};

wSet.add(msg2);

if (wSet.has(msg2)) {
  msg1 = null;
  msg2 = null;
}

console.log(wSet.has(msg1)); // false
console.log(wSet.has(msg2)); // false

console.clear();

// Recursive

function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

console.log(sumTo(100)); // 5050
console.log(sumTo(4)); // 10
console.log(sumTo(1)); // 1

function makeSum(n, acc = 0) {
  return n === 0 ? acc : makeSum(n - 1, n + acc);
}

console.log(makeSum(100)); // 5050
console.log(makeSum(4)); // 10
console.log(makeSum(1)); // 1

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printList(list) {
  console.log(list.value);
  if (list.next) {
    printList(list.next);
  }
}

printList(list);
/*
1
2
3
4
*/

// Rest pars

function sum(...nums) {
  return nums.reduce((sum, next) => {
    return sum + next;
  });
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10

let userInfoWeakMap = new WeakMap();
let userInfoMap = new Map();

function addUserInfo(userName, userSurname, ...otherDetails) {
  let newUser = {
    name: userName,
    surname: userSurname,
  };
  userInfoWeakMap.set(newUser, otherDetails);
  userInfoMap.set(newUser, otherDetails);
}

addUserInfo("John", "Travolta", 68);
let John = {
  name: "John",
  surname: "Travolta",
};

console.log(userInfoWeakMap.get(John)); //undefined
console.log(userInfoMap.get(John)); //undefined

console.log(userInfoWeakMap.get(John)); //undefined
console.log(userInfoMap.get(John)); //undefined

userInfoMap.forEach((value, key) => console.log(`${key} : ${value}`)); // Object : 68

// var

var v1 = "Variable 1";

{
  var v2 = "Variable 2";
}

if (true) {
  var v3 = "Variable 3";
}

function foo() {
  var v4 = "Variable 4";
}

foo();

console.log(`Var 1 : ${v1}`); // String
console.log(`Var 2 : ${v2}`); // String
console.log(`Var 3 : ${v3}`); // String
//console.log(`Var 4 : ${v4}`); // not defined

// Объект функции (не понял, к чему это вообще)

console.log(foo.length); // 0
console.log(addUserInfo.length); // 2 (а думал, что 3)
console.log(foo.name); // foo

function makeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = (countValue) => (count = countValue);
  counter.decrease = () => (count -= 1);

  return counter;
}

let counterVar = makeCounter();
console.log(typeof counterVar); // function
counterVar.set(10);
console.log(counterVar()); // 10

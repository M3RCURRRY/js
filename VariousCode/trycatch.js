console.clear();

try {
  console.log(abc);
} catch (err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // abc is not defined
  //console.log(err.stack); // Очень страшно, stacktrace что ли
}

let correctJSON = '{"name":"John", "age": 30}';
let parsedJSON = JSON.parse(correctJSON);
console.log(parsedJSON); // name : "John", age: 30

let brokenJSON = '{name: "John";}';
// let unparsedJSON = JSON.parse(brokenJSON); // unexpected token
let unparsedJSON = null;
try {
  unparsedJSON = JSON.parse(brokenJSON);
} catch (err) {
  console.log(err.name); // SyntaxError
  console.log(err.message); // Unexpected token n in JSON at position 1
}

let error = new TypeError("Ошибочка типизации");
console.log(error.name); // TypeError
console.log(error.message); // Ошибочка типизации

let obj1 = {
  name: "John",
  age: 30,
};

try {
  if (!obj1.surname) {
    throw new ReferenceError("No surname in userdata");
  }
} catch (err) {
  console.log(`${err.name} - ${err.message}`); // Reference error - No surname in userdata
}

function foo() {
  let obj2 = {
    name: "Alex",
  };

  try {
    fee();
  } catch (e) {
    if (e.name != SyntaxError) {
      throw e;
    }
  }
}

try {
  foo();
} catch (e) {
  console.log(`${e.name} - вас поймали внешним обработчиком`); // ReferenceError - ...
}

try {
  menya_net();
} catch (e) {
  console.log("catch scope");
} finally {
  console.log("finally scope");
}

function f() {
  try {
    nonexist();
  } finally {
    console.log("finally in function");
  }
}

try {
  f();
} catch (e) {
  console.log(`Outer catch : ${e.name}`);
} finally {
  console.log("Outer finally");
}

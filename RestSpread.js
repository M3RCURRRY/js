console.clear();

let arr1 = [1, 2, 3, 4];
let objFromArray = { ...arr1 };
console.log(objFromArray); // object [index: array value]
// let arrayFromObj = [...objFromArray]; // non-iterable instance
let testObj = {
  val1: 1,
  val2: 2,
  val3: 3
};
// let testArray = [...testObj]; // non-iterable instance
const testArrayKeys = [...Object.keys(testObj)];
const testArrayValues = [...Object.values(testObj)];
const testArrayEntries = [...Object.entries(testObj)];
console.log(testArrayKeys); // val1, val2, val3
console.log(testArrayValues); // 1, 2, 3
console.log(testArrayEntries); // Array(2), Array(2), Array(2)

function foo(value, ...args) {
  return args.length;
}

console.log(foo(1, 2, 3, 4)); // 3
console.log(foo.length); // 1
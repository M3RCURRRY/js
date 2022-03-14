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

/*
 * Object to Array cast
 * Array to Object cast
 */

let obj1 = {
  first: 1,
  second: 2,
  third: 3
};

let array1 = [
  ["first", 1],
  ["second", 2],
  ["third", 3]
];

let obj2 = { ...obj1 };
obj2[Symbol.iterator] = function () {
  const items = Object.entries(this);
  let i = 0;
  return {
    next: () => ({
      done: i >= items.length,
      value: items[i++]
    })
  };
};

let array2 = [...array1];
array2[Symbol.iterator] = function () {
  const items = Object.values(this);
  let i = 0;
  return {
    next: () => ({
      done: i >= items.length,
      value: items[i++]
    })
  };
};

/*
 * DESTRUCTION: OBJECT -> OBJECT
 */

const { f1, ...frest } = obj1;
// const [g1, ...grest] = obj1; // non-iterable instance
console.log(`f1 : ${f1}`); // f1 : undefined
console.log(`frest : ${frest}`); // frest : object
console.log(frest.first); // 1
console.log(frest.second); // 2
console.log(frest.third); // 3

const { h1, h2, ...hrest } = obj1;
console.log(h1); // undefined
console.log(h2); // undefined
console.log(hrest); // object

const { b1, ...brest } = array1;
console.log(b1); // undefined
console.log(brest); // object (0 : Array[ ['first', 1], ..., ['third', 3] ])

const [o1, o2, o3] = obj2;
console.log(...obj2); // ['first', 1] ['second', 2] ['third', 3]
console.log(`o1 : ${o1}, o2 : ${o2}, o3 : ${o3}`); // *pairs of entries*;

const [a1, a2, a3] = array1;
console.log(a1); // "first", 1
console.log(a2); // "second", 2
console.log(a3); // "third", 3

const { r1, r2, r3 } = array1;
console.log(r1); // undefined
console.log(r2); // undefined
console.log(r3); // undefined

const { k1, k2, ...k3 } = array2;
console.log(k1); // undefined
console.log(k2); // undefined
console.log(k3); // object (0 : Array[ ['first', 1], ..., ['third', 3] ])
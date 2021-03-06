// ---------------------
// Преобразования типов
// ---------------------

console.log("Number - String");
console.log(+"3");
console.log(Number("3"));
console.log(String(4));
console.log(4 + "");

console.log("UF, NaN, null - Number");
console.log(Number(undefined)); // NaN ???
console.log(Number(NaN)); // NaN
console.log(Number(null)); // 0

console.log("Bitwise NOT to UF, NaN, null");
console.log(~~undefined); // 0
console.log(~~NaN); // 0
console.log(~~null); // 0

console.log("Logical NOT to UF, NaN, null");
console.log(!undefined); // true
console.log(!NaN); // true
console.log(!null); // true

console.log("Comparisons");
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(NaN == NaN); // false
console.log(~~NaN === ~~NaN); // true
console.log(!NaN === !NaN); // true

console.log("Typeof UF, NaN, null");
console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof NaN); // "number"

console.log("?????????"); // Не помню зачем
console.log(null + null); // 0
console.log(undefined + undefined); // NaN
console.log(NaN + undefined); // NaN
console.log(null + undefined); // NaN

let fooFather = {
  name: 10,
  fooSon: () => {
      console.log(this.name);
  },
};

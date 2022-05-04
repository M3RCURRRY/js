console.clear();

console.log("AND");
console.log(0 & 0); // 0
console.log(0 & 1); // 0
console.log(1 & 0); // 0
console.log(1 & 1); // 1

console.log("OR");
console.log(0 | 0); // 0
console.log(0 | 1); // 1
console.log(1 | 0); // 1
console.log(1 | 1); // 1

console.log("XOR");
console.log(0 ^ 0); // 0
console.log(0 ^ 1); // 1
console.log(1 ^ 0); // 1
console.log(1 ^ 1); // 0

console.log("BITWISE NOT");
console.log(~0); // -1
console.log(~1); // -2

console.log("SHIFT RIGHT");
let shift_right = 100;
console.log(shift_right >> 1); // 50
console.log(shift_right >> 2); // 25
console.log(shift_right >> 3); // 12

console.log("SHIFT LEFT");
let shift = 8;
console.log(shift << 1); // 16
console.log(shift << 2); // 32
console.log(shift << 3); // 64

console.log("ROUND TO INT");
console.log(1.111 ^ 0); // 1
console.log(~~1.111); // 1

const test1 = 5;
const test2 = -1;

if (~test1) {
  console.log("Выполнится");
}

if (~test2) {
  console.log("Не выполнится");
} else {
  console.log("А вот это выполнится");
}

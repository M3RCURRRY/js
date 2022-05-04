console.clear();

const int = 1234567890123456789012345678901234567890n;
const bigInt = BigInt("1234567890123456789012345678901234567890");
const bigintFromInt = BigInt(123456789);

console.log(bigintFromInt); // 123456789
console.log(10n + 1000n); // 1010

const a = BigInt("11");
const b = 9;

console.log(a + BigInt(b)); // 20
console.log(Number(a) + b); // 20

if (0n) {
  console.log("Не выполнится");
}

if (1n) {
  console.log("Выполнится");
}

console.log(3n || 5); // 3
console.log(0n || 1); // 1

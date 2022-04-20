console.clear();

async function returnOne() {
  return 1;
}

returnOne().then(console.log); // 1

async function justWait() {
  const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });

  let result = await waitPromise;

  return result;
}

justWait().then(console.log); // 2 через 2 секунды

//
// ------------
// New snapshot
// ------------
//

console.clear();

async function asyncFoo() {
  let result = await new Promise((resolve) => {
    setTimeout(() => resolve("sample result"), 1000);
  });
  return result;
}

let ud = asyncFoo();
console.log(ud); // Pending promise (синхронный код)

(async function () {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("1500 ms result");
    }, 1500);
  });
})(); // 1500 ms result

let writeHere = null;
(async () => {
  writeHere = await asyncFoo();
  console.log(writeHere);
})(); // sample result (через 1 секунду)

//thenable object example
class ThenableSquare {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    setTimeout(() => {
      resolve(this.num ** 2);
    }, 500);
  }
}

async function f() {
  let result = await new ThenableSquare(10);
  console.log(result); // (*)
}
f(); // (*) 100

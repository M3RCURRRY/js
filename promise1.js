console.clear();

const p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve(123), 1);
});

let v = null;

p1.then(
  function (resolve) {
    v = resolve;
    console.log(resolve); // 123
  },
  function (reject) {
    console.log(reject);
  }
);

console.log(v); // null
setTimeout(() => console.log(v), 2); // 123

const p2 = new Promise(function (resolve, reject) {
  setTimeout(reject("Rejected"), 4);
});

p2.then(
  function (resolve) {
    console.log(resolve);
  },
  function (reject) {
    console.log(reject); // rejected
  }
);

let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Ошибка!")), 5);
});

promise.catch(function (error) {
  console.log(error); // Error: "Ошибка!"
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(resolve("finally and resolve passed"));
});

p3.finally(() => {
  console.log("Finally block!"); // Finally block!
}).then((resolve) => {
  console.log(resolve); // finally and resolve passed
});

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });

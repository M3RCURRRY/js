console.clear();

// Поочередность промисов сохраняется
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 300)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 200)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 100)), // 3
]).then(console.log);

// Ошибкой игнорируются результаты выполнения остальных промисов
Promise.all([
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Unexpected error"), 300)
  ),
  new Promise((resolve) => setTimeout(() => resolve(2), 200)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 100)), // 3
])
  .then(console.log)
  .catch((error) => {
    console.log(error); // Unexpected error
  });

let testSettled = Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve("Settle1"), 100)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject("Settled error"), 110)
  ),
  new Promise((resolve) => setTimeout(() => resolve("Settle2"), 120)),
]).then((result) => {
  result.forEach((r) => {
    console.log(r);
    // fulfilled, Settled1
    // rejected, Settled error
    // fulfilled, Settled1
  });
});

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("Fast"), 10)),
  new Promise((resolve) => setTimeout(() => resolve("Slow"), 15)),
  new Promise((resolve) => setTimeout(() => resolve("Fastest"))),
]).then(console.log); // Fastest

let a = Promise.resolve("Resolve Result");
a.then((r) => {
  console.log(r); // Resolve Result
});

let b = Promise.reject("Promise.reject Error");
b.catch((err) => {
  console.log(err); // Promise.reject Error
});

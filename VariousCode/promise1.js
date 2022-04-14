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


let pr1 = null;
try {
  pr1 = new Promise((resolve, reject) => {
    const a = 10;
    try {
      a = 40;
    } catch (e) {
      console.log(e.name); // TypeError
      reject(e);
    }
    resolve(a);
  });
} catch (e) {
  console.log(e.name); // Не ловит
}

pr1.catch(function (reject) {
  console.log(reject); // TypeError: "a" is read-only
});


const constA = 10;

new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (constA === 11) {
      resolve("Success");
    }
    reject("Error");
  }, 1000);
})
  .finally(() => {
    console.log("Promise started");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error); // Error
  });

fetch("https://no-such-server.blabla")
  .then((response) => response.json())
  .catch((err) => console.log(err)); // TypeError: failed to fetch

new Promise(function (resolve, reject) {
  //t = 100; //SyntaxError не ловит
  throw new Error("Ошибо4ка"); // Словит

  //Не ловит
  /*
  setTimeout(() => {
    throw new Error("Ошибо4ка");
  }, 1);
  */
}).catch(console.log);

new Promise(function (resolve, reject) {
  noSuchFunction();
}).catch(console.log); // ReferenceError

new Promise(function (resolve, reject) {
  setTimeout(() => {
    //noSuchFunction(); // Не словит
    reject("Reject instead");
  }, 0);
})
  .catch(console.log) // Reject instead
  .then((resolve) => {
    console.log("А теперь выведет ", resolve); // А теперь выведет undefined
  });
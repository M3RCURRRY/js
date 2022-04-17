console.clear();

// Callback implementation
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error("Can't upload script!"));
  document.head.append(script);
}

loadScript("./good.js", (err, script) => {
  if (err) {
    console.log(err);
  } else {
    console.log(success()); // "root:root"
  }
});

loadScript("./no-such-script.js", (err, script) => {
  if (err) {
    console.log(err); // Error: Can't upload script!
  } else {
    console.log("Script has been loaded!");
    console.log(success());
  }
});

// Promise implementation
let loadByPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) {
        reject(err);
      } else {
        resolve(script);
      }
    });
  });
};

loadByPromise("./good.js").then((result) => {
  console.log(success()); // root:root
}).catch((err) => {
  console.log(err.name);
})

// Promisify
function promisify(f) {
  return function (...args) { // аргументы нашей промисифицируемой функции
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем коллбэк в конец аргументов
      f.call(this, ...args); // дёргаем функцию с переданными аргументами + коллбэком
    });
  };
};

let loadScriptPromise = promisify(loadScript);
loadScriptPromise("./best.js").then(() => {
  console.log(doBest()); // made the best!
});
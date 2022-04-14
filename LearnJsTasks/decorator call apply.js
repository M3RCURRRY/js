/*
 * Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.
 * Каждый вызов должен сохраняться как массив аргументов.
 */
/* Например
function work(a, b) {
  alert( a + b ); // произвольная функция или метод
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
*/

console.clear();

function work(a, b) {
  return a + b;
}

function spy(func) {
  f.calls = [];
  function f(...args) {
    f.calls.push(args);
    return func.apply(this, args);
  }
  return f;
}

work = spy(work);

console.log(work(1, 2)); // 3
console.log(work(3, 7)); // 10

console.log(work.calls); // [ [1,2], [3,7] ]

/*
 * Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
 */

function f(x) {
  alert(x);
}

function delay(func, time) {
  return function () {
    setTimeout(() => {
      func.apply(this, arguments);
    }, time);
  };
}

// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс

/*
 * Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд.
 * Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.
 */

function debounce(func, time) {
  let flag = false;
  return function () {
    if (flag) return;
    f.apply(this, arguments);
    flag = true;
    setTimeout(() => (flag = false), time);
  };
}

let f = debounce(alert, 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout(() => f(4), 1100); // выполняется
setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

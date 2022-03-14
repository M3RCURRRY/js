/* Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.
 *
 * Cделайте два варианта решения.
 *
 * Используя setInterval.
 * Используя рекурсивный setTimeout.
 */

// Через setInterval

function printNumbers(from, to) {
  let counter = from;
  let timer = setInterval(() => {
    console.log(counter);
    if (counter >= to) {
      clearInterval(timer);
    }
    counter++;
  }, 1000);
}

printNumbers(5, 10);

// Через рекурсивный setTimeout

function recursivePrintNumber(from, to) {
  let counter = from;
  setTimeout(function count() {
    console.log(counter);
    if (counter < to) {
      setTimeout(count, 1000);
    }
    counter++;
  }, 1000);
}

recursivePrintNumber(5, 10);

//HOW TO Перебрать генератор

function* iterGen() {
  yield "a";
  yield "b";
  yield "c";
}

for (let item of iterGen()) {
  console.log(item); //a, b, c, d
}

const g = iterGen();
console.log(g.next().value); // a
console.log(g.next().value); // b
console.log(g.next().value); // c

const g1 = [...iterGen()];
console.log(g1); // ["a", "b", "c"]

const g2 = Array.from(iterGen());
console.log(g2); // ["a", "b", "c"]

//
// Additional approach
//

const g3 = iterGen();
let uselessFlag = false;

for (let item of g3) {
  if (uselessFlag) {
    break;
  }
  console.log(`In for loop : ${item}`);
  uselessFlag = true;
}

console.log(g3.next()); // value : undefined, done : true

const g4 = iterGen();

for (let i = 0; i < 1; i++) {
  console.log(`Inc loop : ${g4.next().value}`); // Inc loop : a
}
console.log(g4.next().value); // b

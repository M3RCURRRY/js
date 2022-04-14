console.clear();

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();
console.log(generator.next()); // value: 1, done: false
console.log(generator.next()); // value: 2, done: false
console.log(generator.next()); // value: 3, done: true

function* iterateThrough() {
  yield "a";
  yield "b";
  yield "c";
  return "d";
}

for (let item of iterateThrough()) {
  console.log(item); // a -> b -> c
}

let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }
};

console.log(...range); //1 2 3 4 5

function* iterationGen(from, to) {
  let sum = 0;
  for (let i = from; i < to; i++) {
    sum += i;
  }
  yield sum;
}

function* composeGen() {
  yield* iterationGen(1, 5);
  yield* iterationGen(10, 15);
  yield* iterationGen(30, 35);
}

let res = composeGen();
console.log(res); // GeneratorFunctionProtoype
for (let item of composeGen()) {
  console.log(item); // 10 60 160
}

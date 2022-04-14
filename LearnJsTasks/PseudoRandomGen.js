console.clear();

function* pseudoRandom(seed) {
  //next = previous * 16807 % 2147483647
  let current = seed;
  for (;;) {
    current = (current * 16807) % 2147483647;
    yield current;
  }
}

let g = pseudoRandom(1);
console.log(g.next());
console.log(g.next());
console.log(g.next());

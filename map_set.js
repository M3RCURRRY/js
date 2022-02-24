let map1 = new Map();
map1.set(1, "1");
map1.set("1", 1);

const entries = [
	["name", "Victor"],
  ["surname", "Dudka"],
  ["age", 26],
];

let obj = {
  name: "Victor",
  surname: "Dudka",
  age: 26,
};

const map2 = new Map(entries);
const map3 = new Map(Object.entries(obj));


const solo = [ [1], [2], [3] ];
const map4 = new Map(solo);
for(let item of map4) { console.log(item); }


for (let i of map1) {
	//console.log(i);
}

map2.forEach((value) => {
	//console.log(`${value}`);
})

map2.forEach((value, key, maaaaap) => {
	console.log(`${key} : ${value}`);
})


for (let i of map2.keys()) {
  console.log(`Map2: ${i}`);
}

for (let i of map3.keys()) {
  console.log(`Map3: ${i}`);
}

const keys2 = map2.keys();
const values2 = map2.values();
const ent2 = map2.entries();

for(let item of values2) {
	console.log(`Items : ${item}`);
}

let set = new Set(["a", "b", "c"]);
console.log(Array.from(set));
set = new Set([ [1, "a"], [2, "b"], [3, "c"] ]);
console.log(Array.from(set));

const array1 = [1, 2, 3, 3, 4, 5, 2, 1];
const unique1 = [...new Set(array1)];
const unique2 = Array.from(new Set(array1));
console.log(unique1);
console.log(unique2);

//-----------
//-----------

// Task 1

function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // Hare,Krishna,:-O

// Task 2

function aclean(arr) {	
	let charList = new Map();
  for(let item of arr) {
  	let splited = item.toLowerCase().split('');
  	charList.set(splited.sort().join(), item);
  }
  return Array.from(charList.values()); // или return [...charList.values()];
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) );

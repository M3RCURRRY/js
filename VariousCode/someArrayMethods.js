const braces = ["(", "[", "{"];

function countBraces(str) {
  let br = str.split("").reduce((acc, char) => {
    return braces.includes(char) ? acc + 1 : acc - 1;
  }, 0);

  return !br;
}

console.log(countBraces("(()())"));
console.log(countBraces("(()()"));

console.log(countBraces("([{]})"));
console.log(countBraces("([{]})]"));

function removeCopies(arr) {
  return arr.reduce((acc, item) => {
    return Array.from(acc).includes(item) ? acc : [...acc, item];
  }, []);
}

function anotherRemoveCopies(arr) {
  return Array.from(new Set(arr));
}

const nums = [1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9];

console.log(removeCopies(nums));
console.log(anotherRemoveCopies(nums));
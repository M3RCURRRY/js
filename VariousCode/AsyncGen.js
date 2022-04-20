console.clear();

let obj1 = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: `Value : ${this.current++}` };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (let item of obj1) {
  console.log(item); // Value: 1, Value: 2, ...
}

let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,

      async next() {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (let value of range) {
    console.log(value); // 1,2,3,4,5
  }
})();

let range1 = {
  from: 1,
  to: 5,
  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {
  for await (let value of range1) {
    console.log(`Async Iterator : ${value}`); // Async Iterator : 1, Async Iterator : 2, ...
  }
})();
console.clear();

function QueryPromiseWrapper(promise) {
  let wrapped = promise
    .then((result) => {
      wrapped.status = "Fulfilled";
      return result;
    })
    .catch((error) => {
      wrapped.status = "Rejected";
      throw error;
    });

  if (wrapped.status === undefined) {
    wrapped.status = "Pending";
  }

  return wrapped;
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});

const wrappedPromise = QueryPromiseWrapper(p);
console.log(wrappedPromise.status); // Pending
setTimeout(() => {
  console.log(wrappedPromise.status); // Fulfilled
}, 1100);

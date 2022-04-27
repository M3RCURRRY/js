export default function awaitOnYields(generatorToProcess) {
  let awaitResults = [];
  let promiseValue = generatorToProcess.next();
  console.log(promiseValue);
  console.log(promiseValue.value);
  while (promiseValue.done === false) {
    console.log(promiseValue);
    new Promise((resolve, reject) => {
      resolve(
        promiseValue.value.then((result) => {
          return result;
        })
      );
    }).then((r) => {
			awaitResults.push(r);
      promiseValue = generatorToProcess.next();
    });
  }
  console.log(promiseValue);
  return awaitResults;
}

export default function awaitOnYields(generatorToProcess) {
  function callNext() {
    let v = generatorToProcess.next();
    if (v.done === false) {
      v.value.then((res) => {
        awaitResults.push(res);
        callNext();
      });
    }
  }
  let awaitResults = [];
  callNext();

  return awaitResults;
}

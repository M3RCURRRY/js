console.clear();

async function retPromise() {
  return await new Promise((resolve, reject) => {
    resolve("Sample Result");
  });
}

retPromise().then((r) => {
  console.log(r); // Sample Result
});

async function retValue() {
  await new Promise((resolve, reject) => {
    resolve("retValue");
  });
  return await 10;
}

retValue().then((r) => {
  console.log(r); // 10
});

async function retObj() {
  let obj = {
    value: 1000
  };
  return await obj;
}

retObj().then((r) => {
  console.log(r); // {value : 1000}
});

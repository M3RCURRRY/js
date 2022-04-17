console.clear();

async function returnOne() {
  return 1;
}

returnOne().then(console.log); // 1

async function justWait() {
  const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });

  let result = await waitPromise;

  return result;
}

justWait().then(console.log); // 2 через 2 секунды
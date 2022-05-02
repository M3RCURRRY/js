console.clear();
let cmd = 'console.log("Jopa!")';
let math = "1+2";

console.log(eval(cmd)); // Jopa! -> undefined
console.log(eval(math)); // 3
console.log(eval(math) == 3); // true

let x = 1;
{
  // Codesandbox : x not defined????
  // Console : unsafe Eval
  //because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive
  let x = 5;
  window.eval("console.log(x)");
}

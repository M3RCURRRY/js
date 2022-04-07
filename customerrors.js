console.clear();

class FunctionCallError extends Error {
  constructor(cause, message) {
    super(message);
    this.cause = cause;
    this.name = "FunctionCallError";
  }
}

class NotEnoughArgsError extends FunctionCallError {
  constructor(message) {
    super(message);
    console.log(this.cause);
    this.name = "Not enough arguments exception";
  }
}

const arr = [1, 2, 3];

function callFunc(args) {
  if (args.length < 5) {
    throw new NotEnoughArgsError("args123");
  }
}

//callFunc(arr); // args123, Not enough arguments exception

try {
  callFunc(arr);
} catch (err) {
  if (err instanceof NotEnoughArgsError) {
    throw new NotEnoughArgsError("Error in try-catch");
  } else {
    throw new FunctionCallError("FuncCallError in try-catch");
  }
}

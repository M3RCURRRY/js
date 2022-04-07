console.clear();
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = "FormatError";
  }
}

let err = new FormatError("Formatting error");

console.log(err.message); // Formatting error
console.log(err.name); // FormatError
console.log(err.stack); // stacktrace
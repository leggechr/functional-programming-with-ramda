const R = require('ramda');

const list = [1, 2, 3, 4, 5];

// `Array.protoype.reverse` is not pure. Calling it with the same input will not return
// the same output
list.reverse(); // => [5, 4, 3, 2, 1]
list.reverse(); // => [1, 2, 3, 4, 5]

// `R.reverse` is pure. Calling it with the same input will return the same output.
R.reverse(list) // => [5, 4, 3, 2, 1]
R.reverse(list) // => [5, 4, 3, 2, 1]

let counter = 0;

// `incrementSideEffects` increments the global variable `counter`. It has side effects
function incrementSideEffects() {
  counter++;
  return counter;
}

incrementSideEffects(); // => 1
incrementSideEffects(); // => 2
counter; // => 2

counter = 0;

// `incrementNoSideEffects` doesn't touch global variables. It has no side effects
function incrementNoSideEffects(num) {
  return num + 1;
}

incrementNoSideEffects(counter) // => 1
incrementNoSideEffects(counter) // => 1
counter; // => 0

// Generating random numbers is not pure
Math.random() // => ???
// Getting the current date is not pure
Date.now() // => ???

// Writing to the console, making an HTTP request are other examples of functions with side
// effects. Side effects themselves aren't bad and are often necessary but the functions that have
// them aren't pure.

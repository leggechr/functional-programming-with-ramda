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

// `incrementImpure` incrememts the global variable `counter`. It has side effects
function incrementImpure() {
  counter++;
  return counter;
}

incrementImpure(); // => 1
incrementImpure(); // => 2
counter; // => 2

counter = 0;

// `incrementPure` doesn't touch global variables. It has no side effects
function incrementPure(num) {
  return num + 1;
}

incrementPure(counter) // => 1
incrementPure(counter) // => 1
counter; // => 0

// Generating random numbers has side effects
Math.random() // => ???
// Getting the current date has side effects
Date.now() // => ???

// Writing to the console, making an HTTP request are other examples of functions with side
// effects. Side effects themselves aren't bad and are often necessary but the functions that have
// them aren't pure.

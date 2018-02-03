const R = require('ramda');

// Functions can be assigned to variables
const abs = Math.abs;
abs(-1) // => 1

// Functions can be passed as parameters
function map(fn, array) {
  return array.map(fn);
}

map(abs, [-1, 2, -3]); // => [1, 2, 3]

// Regular implementation of an add function
function add(a, b) {
  return a + b;
}

add(1); // => NaN
add(1, 2); // => 3

// Curried implementation of the same add function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  }
}

curriedAdd(1); // => [Function]
curriedAdd(1)(2); // => 3

const add5 = curriedAdd(5);
add5(1); // => 6
add5(7); // => 12

const ramdaCurriedAdd = R.curry(add);
ramdaCurriedAdd(1); // => [Function]
ramdaCurriedAdd(1)(2); // => 3
ramdaCurriedAdd(1, 2); // => 3

const add3 = ramdaCurriedAdd(3);
add3(2); // => 5
add3(4); // => 7

const R = require('ramda');

const compose = (f, g) => (a) => f(g(a))

function compose (f, g) {
   return function (a) {
       return f(g(a));
   }
}

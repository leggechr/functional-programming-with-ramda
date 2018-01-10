const R = require('ramda');

// we want to construct a string by doing the following steps:
// 1. split the name into an array on spaces
// 2. map the name to lower case
// 3. join with dashes
// 4. encode the URI component

// In plain javascript we could do this
const formatStringNested = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);

// We could also have intermediate variables that we perform actions on
function formatStringIntermediateVariables(input) {
  const splitString = input.split(' ');
  const lowerCaseString = splitString.map(str => str.toLowerCase());
  const joinedString = lowerCaseString.join('-');
  return encodeURIComponent(joinedString);
}

// What we are doing is function composition, combining multiple functions to make a new
// function. This could look like the following with a bunch of composable functions. This
// is very hard to read
const formatStringRamdaNested = input => (
  encodeURIComponent(R.join('-', R.map(R.toLower, R.split(' ', input))))
);

// Ramda provides us with `R.compose` which takes care of the function composition for us.
// We pass this a value and that value passes through these series of instructions. The
// ouput of the first function is the input to the next and so on
const formatStringRamda = R.compose(
  encodeURIComponent,
  R.join('-'),
  R.map(R.toLower),
  R.split(' ')
);

// `R.pipe` is the same as `R.compose` but the functions get executed from left to right
// as opposed to right to left above
const formatStringRamdaPipe = R.pipe(
  R.split(' '),
  R.map(R.toLower),
  R.join('-'),
  encodeURIComponent
);

// all of the above functions do the same thing
formatStringRamda('Christine Legge') // => christine-legge

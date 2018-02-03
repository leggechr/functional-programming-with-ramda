const R = require('ramda');

// we want to construct a string by doing the following steps:
// 1. split the name into an array on spaces
// 2. map the name to lower case
// 3. join with dashes
// 4. encode the URI component

// We could have intermediate variables that we perform actions on
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
  encodeURIComponent(
    R.join('-',
      R.map(
        R.toLower,
        R.split(' ', input)
      )
    )
  )
);

// Ramda provides us with `R.compose` which takes care of the function composition for us.
// We pass this a value and that value passes through these series of instructions. The
// ouput of the first function is the input to the next and so on
const formatStringRamda = R.compose(
  encodeURIComponent, // String -> String
  R.join('-'),        // [String] -> String
  R.map(R.toLower),   // [String] -> [String]
  R.split(' ')        // String -> [String]
);

// `R.pipe` is the same as `R.compose` but the functions get executed from left to right
// as opposed to right to left above. This might be easier to read because it looks the same
// as our initial sequence of instructions
const formatStringRamdaPipe = R.pipe(
  R.split(' '),      // String -> [String]
  R.map(R.toLower),  // [String] -> [String]
  R.join('-'),       // [String] -> String
  encodeURIComponent // String -> String
);

// We can write the same function in plain javascript without the intermediate variables
// as well
const formatStringJS = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);

// all of the above functions do the same thing
formatStringRamda('Christine Legge') // => christine-legge

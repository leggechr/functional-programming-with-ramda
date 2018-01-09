const R = require('ramda');

const tweet = {
  text: 'Welcome to DeveloperWeek!',
};

// Using `.` this mutates the original tweet object. This is not functional.
tweet.user = 'christine'; // => 'christine'

// `Object.assign()` copies all the values from the source object to a target object and
// returns the new target object. It does not mutate the original tweet object. It is
// functional.
Object.assign({}, tweet, { favourites: 100 });
// => {
//      text: 'Welcome to DeveloperWeek!',
//      user: 'christine'
//      favourites: 100
//    }

// `R.assoc` is a Ramda function that updates the provided prop and returns a new object.
// It doesn't mutate the original tweet object. It is functional.
R.assoc('favourites', 1000, tweet);
// => {
//      text: 'Welcome to DeveloperWeek!',
//      user: 'christine'
//      favourites: 1000
//    }

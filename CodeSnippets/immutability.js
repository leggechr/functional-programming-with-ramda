const R = require('ramda');

const tweet = {
  text: 'Welcome to DeveloperWeek!',
};

// Using `.` this mutates the original tweet object. This is not functional.
tweet.user = 'christine'; // => 'christine'

// `R.assoc` is a Ramda function that updates the provided prop and returns a new object.
// It doesn't mutate the original tweet object. It is functional.
R.assoc('favourites', 1000, tweet);
// => {
//      text: 'Welcome to DeveloperWeek!',
//      user: 'christine'
//      favourites: 1000
//    }

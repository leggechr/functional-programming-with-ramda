const R = require('ramda');

const tweet1 = {
  text: 'Functional programming is so fun #DeveloperWeek',
  user: 'christine',
  favourites: 150
};

const tweets = [
  {
    text: 'If only Bradley\'s arm was longer. Best photo ever. #oscars',
    user: 'ellen',
    favourites: 2395667
  },
  {
    text: 'HELP ME PLEASE. A MAN NEEDS HIS NUGGS',
    user: 'Carter',
    favourites: 989122
  },
  {
    text: 'Always in my heart @Harry_Styles . Yours sincerely, Louis',
    user: 'Louis',
    favourites: 1041406
  }
];

// All Ramda functions are automatically curried
R.add(3, 2) // => 5

const add1 = R.add(1);
add1; // => [Function]
add1(4); // => 5

R.prop('text', tweet1); // => 'Functional programming is so fun #DeveloperWeek'

const text = R.prop('text');
text; // => [Function]
text(tweet1); // => 'Functional programming is so fun #DeveloperWeek'

R.map(text, tweets) // => ['If only....', 'HELP ME....', 'Always in.....']

const tweetTexts = R.map(text);
tweetTexts // => [Function]
tweetTexts(text) // => ['If only....', 'HELP ME....', 'Always in.....']

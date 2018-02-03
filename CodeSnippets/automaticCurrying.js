const R = require('ramda');

const tweet = {
  text: 'Just setting up my Twitter. #myfirstTweet',
  user: 'christine',
  favourites: 1
};

const tweetList = [
  {
    text: 'If only Bradley\'s arm was longer. Best photo ever. #oscars',
    user: 'ellen',
    favourites: 2395667
  },
  {
    text: 'HELP ME PLEASE. A MAN NEEDS HIS NUGGS',
    user: 'carter',
    favourites: 989122
  },
  {
    text: 'Always in my heart @Harry_Styles . Yours sincerely, Louis',
    user: 'louis',
    favourites: 1041406
  }
];

// All Ramda functions are automatically curried
R.add(3, 2) // => 5

const add1 = R.add(1);
add1; // => [Function]
add1(4); // => 5

R.prop('text', tweet); // => 'Functional programming is so fun #DeveloperWeek'

const getText = R.prop('text');
getText; // => [Function]
getText(tweet); // => 'Functional programming is so fun #DeveloperWeek'

R.map(getText, tweetList) // => ['If only....', 'HELP ME....', 'Always in.....']

const tweetTexts = R.map(getText);
tweetTexts // => [Function]
tweetTexts(tweetList) // => ['If only....', 'HELP ME....', 'Always in.....']

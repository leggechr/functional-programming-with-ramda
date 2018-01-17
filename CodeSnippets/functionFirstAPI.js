const _ = require('underscore');
const R = require('ramda');

const tweetList = [
  {
    text: 'If only Bradley\'s arm was longer. Best photo ever. #oscars',
    user: 'ellen',
    favourites: 2395667
  },
  {
    text: 'Congratulations on winning gold, Team Canada! #WorldJuniors #GoCanadaGo',
    user: 'stephen',
    favourites: 3400
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
  },
  {
    text: 'Just setting up my Twitter. #myfirstTweet',
    user: 'christine',
    favourites: 0
  },
];

const isPopular = tweet => tweet.favourites > 500000;

// rename these to have a verb
const popularTweets = tweets => (
  tweets.filter(isPopular)
);

const popularTweetsUnderscore = tweets => ( // change to lodash
  _.filter(tweets, isPopular)
);

const popularTweetsRamda = R.filter(isPopular);

popularTweets(tweetList);
popularTweetsUnderscore(tweetList);
popularTweetsRamda(tweetList);
// => [
//      {
//        text: 'If only....',
//        user: 'ellen',
//        favourites: 2395667
//      },
//      {
//        text: 'HELP ME....',
//        user: 'carter',
//        favourites: 989122
//      },
//      {
//        text: 'Always in....',
//        user: 'louis',
//        favourites: 1041406
//      },
//    ]

const yellTweets = tweets => (
  tweets.map(
    tweet => (tweet.text.toUpperCase())
  )
);

const yellTweetsUnderscore = tweets => (
  _.map(tweets, tweet => (
    tweet.text.toUpperCase()
  ))
);

const yellTweetsRamda = R.map(
  R.compose(R.toUpper, R.prop('text'))
);

yellTweets(tweetList);
yellTweetsUnderscore(tweetList);
yellTweetsRamda(tweetList);
// => [
//      'IF ONLY BRADLEY\'S ARM WAS LONGER. BEST PHOTO EVER. #OSCARS',
//      'CONGRATULATIONS ON WINNING GOLD, TEAM CANADA! #WORLDJUNIORS #GOCANADAGO',
//      'HELP ME PLEASE. A MAN NEEDS HIS NUGGS',
//      'ALWAYS IN MY HEART @HARRY_STYLES . YOURS SINCERELY, LOUIS',
//      'JUST SETTING UP MY TWITTER. #MYFIRSTTWEET' ]
//    ]

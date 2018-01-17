const R = require('ramda');
const tweetAnalyzerSideEffects = require('./tweetAnalyzerSideEffects');
const getTweets = tweetAnalyzerSideEffects.getTweets;
const printGraph = tweetAnalyzerSideEffects.printGraph;

const HASHTAGS = [
  'boring',
  'Curling',
  'DeveloperWeek',
  'DonaldTrump',
  'FunctionalProgramming',
  'golang',
  'iHeartAwards',
  'JavaScript',
  'NFLPlayoffs',
  'nodejs',
  'TheBachelor'
];

const tweets = getTweets(HASHTAGS);

const removeDuplicates = R.uniqBy(R.prop('id'));

const getHashtags = R.path(['entities', 'hashtags']);

const filterTweetsByHashtag = R.curry((tweets, hashtag) => (
  R.filter(R.compose(
    R.contains(R.toLower(hashtag)),
    R.map(R.toLower),
    R.pluck('text'),
    getHashtags
  ), tweets)
));

const getTweetsForHashtags = (tweets) => (
  R.map(filterTweetsByHashtag(tweets), HASHTAGS)
);

const groupTweetsByHashtag = R.compose(
  R.zipObj(HASHTAGS),
  getTweetsForHashtags
);

const cleanAndGroupTweets = R.compose(
  groupTweetsByHashtag,
  removeDuplicates
);

const sortByValue = R.compose(
  R.sortBy(R.prop(1)),
  R.toPairs
);

const createHashtagString = R.curry((item, scale, pair) => {
  const hashtag = pair[0],
        num = pair[1];

  const legend = hashtag + ' '.repeat(25 - hashtag.length);
  const bar = item.repeat(Math.ceil(num / scale));
  return legend + bar + ' ' + num;
});

const getGraphStrings = (item, scale) => (
  R.compose(
    R.map(createHashtagString(item, scale)),
    sortByValue
  )
);

// Graph by number of tweets
const getTweetCountForHashtags = R.map(R.length)
const getHashtagTweetCountStrings = R.compose(
  getGraphStrings('█', 10),
  getTweetCountForHashtags,
  cleanAndGroupTweets,
);

// Graph by number of favourites
const filterUnpopularHashtags = R.filter(R.compose(R.lte(50), R.length));
const getFavoriteCountForHashtags = R.map(
  R.compose(
    R.sum,
    R.take(50),
    R.reverse,
    R.sort(R.subtract),
    R.pluck('favorite_count'),
  )
);

const getHashTagFavoriteCountStrings = R.compose(
  getGraphStrings('♥', 10),
  getFavoriteCountForHashtags,
  filterUnpopularHashtags,
  cleanAndGroupTweets,
);

// Graph by average number of favourites per tweet
const getAverageFavoriteCountForHashtags = R.map(
  R.compose(
    R.mean,
    R.pluck('favorite_count')
  )
);

const getAverageFavoriteCountStrings = R.compose(
  getGraphStrings('★', 0.1),
  getAverageFavoriteCountForHashtags,
  cleanAndGroupTweets
);

printGraph(getHashtagTweetCountStrings(tweets));
printGraph(getHashTagFavoriteCountStrings(tweets));
printGraph(getAverageFavoriteCountStrings(tweets));

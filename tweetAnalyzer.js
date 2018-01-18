const R = require('ramda');
const tweetAnalyzerSideEffects = require('./tweetAnalyzerSideEffects');
const getTweets = tweetAnalyzerSideEffects.getTweets;
const printGraph = tweetAnalyzerSideEffects.printGraph;

const HASHTAGS = [
  'boring',
  'cleancode',
  'curling',
  'developerweek',
  'donaldtrump',
  'functionalprogramming',
  'golang',
  'iheartawards',
  'javascript',
  'nflplayoffs',
  'nodejs',
  'thebachelor'
];
const tweets = getTweets(HASHTAGS);

const removeDuplicates = R.uniqBy(R.prop('id'));

const getLowerCaseText = R.compose(R.toLower, R.prop('text'));
const getHashtagsFromTweet = R.compose(
  R.map(getLowerCaseText),
  R.path(['entities', 'hashtags'])
);
const getHashtagInList = R.compose(
  R.ifElse(R.isEmpty, R.always('not-found'), R.head),
  R.intersection(HASHTAGS),
  getHashtagsFromTweet
);
const groupByHashtag = R.groupBy(getHashtagInList)

const sortByValue = R.compose(
  R.fromPairs,
  R.sortBy(R.nth(1)),
  R.toPairs
);

const createHashtagString = R.curry((item, scale, num, hashtag) => {
  const legend = hashtag + ' '.repeat(25 - hashtag.length);
  const bar = item.repeat(Math.ceil(num / scale));
  return legend + bar + ' ' + Math.round(num * 100)/100;
});

const getGraphStrings = (item, scale) => (
  R.compose(
    R.values,
    R.mapObjIndexed(createHashtagString(item, scale)),
    sortByValue
  )
);

// Graph by number of tweets
const getTweetCountForHashtags = R.map(R.length)
const getHashtagTweetCountStrings = R.compose(
  getGraphStrings('█', 10),
  getTweetCountForHashtags,
  groupByHashtag,
  removeDuplicates
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
  groupByHashtag,
  removeDuplicates
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
  groupByHashtag,
  removeDuplicates
);

printGraph(getHashtagTweetCountStrings(tweets));
printGraph(getHashTagFavoriteCountStrings(tweets));
printGraph(getAverageFavoriteCountStrings(tweets));

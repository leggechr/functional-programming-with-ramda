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

// [Tweet] -> [Tweet]
const removeDuplicates = R.uniqBy(R.prop('id_str'));

// Hashtag -> String
const getLowerCaseText = R.pipe(R.prop('text'), R.toLower);
// Tweet -> [String]
const getHashtagsFromTweet = R.pipe(
  R.path(['entities', 'hashtags']),
  R.map(getLowerCaseText)
);
// Tweet -> String
// If the tweet has multiple hashtags that match those in the list HASHTAGS this will
// return the first one and ignore any others
const getHashtagInList = R.pipe(
  getHashtagsFromTweet,
  R.intersection(HASHTAGS),
  R.ifElse(R.isEmpty, R.always('not-found'), R.head)
);
// [Tweet] -> {hashtag-text: [Tweet]}
const groupTweetsByHashtag = R.groupBy(getHashtagInList)

// {hashtag-text: Number} -> [[hashtag-text, Number]]
const sortByValue = R.pipe(
  R.toPairs,
  R.sortBy(R.nth(1))
);

// [Hashtag, Number] -> String
// e.g. createHashtagBar(['cleancode', 40]) -> 'cleancode   ████'
const createHashtagBar = pair => {
  const hashtag = pair[0],
        num = pair[1];

  const legend = hashtag + ' '.repeat(25 - hashtag.length);
  const bar = '█'.repeat(Math.ceil(num / 10));
  return legend + bar + ' ' + Math.round(num * 100)/100;
};

// {hashtag-text: Number} -> String
const constructGraph = R.pipe(
  sortByValue,
  R.map(createHashtagBar),
  R.join('\n')
);

// {hashtag-text: [Tweet]} -> {hashtag-text: Number}
const getTweetCountForHashtags = R.map(R.length);

// [Tweet] -> String
const getTweetCountGraph = R.pipe(
  removeDuplicates,         // [Tweet] -> [Tweet]
  groupTweetsByHashtag,     // [Tweet] -> {hashtag: [Tweet]}
  getTweetCountForHashtags, // {hashtag-text : [Tweet]} -> {hashtag-text: Number}
  constructGraph            // {hashtag-text: Number} -> String
);

const tweetGraph = getTweetCountGraph(tweets);
printGraph(tweetGraph);

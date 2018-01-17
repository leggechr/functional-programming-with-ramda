const R = require('ramda');
const fs = require('fs');

function readFile(hashtag) {
  return JSON.parse(fs.readFileSync('Tweets/' + hashtag + '.txt', 'utf8'));
}

exports.getTweets = (hashtags) => (
  R.compose(
    R.flatten,
    R.map(readFile)
  )(hashtags)
);

exports.printGraph = (graphStrings) => {
  console.log('-------------');
  R.forEach(console.log, graphStrings);
}

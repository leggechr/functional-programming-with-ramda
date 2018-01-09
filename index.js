var OAuth = require('oauth').OAuth;
var R = require('ramda');

const consumerKey = process.env.TWITTER_CONSUMER_KEY,
    consumerSecret = process.env.TWITTER_CONSUMER_SECRET,
    accessToken = process.env.TWITTER_ACCESS_TOKEN,
    tokenSecret = process.env.TWITTER_TOKEN_SECRET;

const searchTerm = 'DonaldTrump';
var searchURL = 'https://api.twitter.com/1.1/search/tweets.json';

var oa = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  consumerKey,
  consumerSecret,
  '1.0',
  null,
  'HMAC-SHA1'
);


oa.get(
  searchURL + '?count=100&q=' + encodeURIComponent('#' + searchTerm),
  accessToken,
  tokenSecret,
  searchCallback
);


// oa.get(
//   'https://api.twitter.com/1.1/account/verify_credentials.json'
// )

function searchCallback(error, twitterResponseData, result) {
  debugger
  var formattedResponse = formatResponse(twitterResponseData);
  console.log(formattedResponse);
}

var getStatuses = R.prop('statuses');
var getTweetInfo = R.pick(['created_at', 'id', 'text', 'user', 'favorite_count']);

var addUserName = function(tweetInfo) {
  var userScreenName = R.path(['user', 'screen_name'], tweetInfo);

  return R.pipe(
    R.dissoc('user'),
    R.assoc('user_name', userScreenName)
  )(tweetInfo);
}

var parseDate = function(tweetInfo) {
  var dateString = R.prop('created_at', tweetInfo);
  return R.assoc('created_at', new Date(dateString), tweetInfo);
}

var formatTweet = R.compose(
  getTweetInfo,
  addUserName,
  parseDate
);

var sortByFavoriteCount = R.pipe(
  R.sortBy(R.prop('favorite_count')),
  R.reverse
);

var sortByDate = R.sortBy(R.prop('created_at'));

var formatResponse = R.pipe(
  JSON.parse,
  getStatuses,
  R.map(formatTweet),
  // sortByFavoriteCount,
  sortByDate
);

// sort list and display tweet and user name
// searchCallback(null, data);
//
// var data = {statuses: [ { created_at: 'Mon Jan 01 15:40:57 +0000 2018',
  //      id: 947855171224244200,
  //      id_str: '947855171224244224',
  //      text: 'RT @axosoft: 💥💻💥 7 tech conferences to check out in 2018 https://t.co/8ReqPMdo2V #DeveloperWeek #GitHubUniverse #NodeSummit #AWS #reInvent…',
  //      truncated: false,
  //      source: '<a href="http://www.jessecanderson.github.io" rel="nofollow">jesse_twitter_bot</a>',
  //      in_reply_to_status_id: null,
  //      in_reply_to_status_id_str: null,
  //      in_reply_to_user_id: null,
  //      in_reply_to_user_id_str: null,
  //      in_reply_to_screen_name: null,
  //      user: {
  //       id: '1',
  //       screen_name: 'christine'
  //      },
  //      geo: null,
  //      coordinates: null,
  //      place: null,
  //      contributors: null,
  //      is_quote_status: false,
  //      retweet_count: 2,
  //      favorite_count: 0,
  //      favorited: false,
  //      retweeted: false,
  //      possibly_sensitive: false,
  //      lang: 'en' },
  //    { created_at: 'Mon Jan 01 15:33:48 +0000 2018',
  //      id: 947853370508931100,
  //      id_str: '947853370508931073',
  //      text: 'RT @axosoft: 💥💻💥 7 tech conferences to check out in 2018 https://t.co/8ReqPMdo2V #DeveloperWeek #GitHubUniverse #NodeSummit #AWS #reInvent…',
  //      truncated: false,
  //      source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //      in_reply_to_status_id: null,
  //      in_reply_to_status_id_str: null,
  //      in_reply_to_user_id: null,
  //      in_reply_to_user_id_str: null,
  //      in_reply_to_screen_name: null,
  //      user: {
  //        id: 2,
  //        screen_name: 'pablo'
  //      },
  //      geo: null,
  //      coordinates: null,
  //      place: null,
  //      contributors: null,
  //      is_quote_status: false,
  //      retweet_count: 2,
  //      favorite_count: 0,
  //      favorited: false,
  //      retweeted: false,
  //      possibly_sensitive: false,
  //      lang: 'en' },
  //    { created_at: 'Mon Jan 01 08:39:29 +0000 2018',
  //      id: 947749103412314100,
  //      id_str: '947749103412314112',
  //      text: 'The latest Long Street Life! https://t.co/O2QmVOUfdu Thanks to @MwedziGlass #developerweek',
  //      truncated: false,
  //      source: '<a href="http://paper.li" rel="nofollow">Paper.li</a>',
  //      in_reply_to_status_id: null,
  //      in_reply_to_status_id_str: null,
  //      in_reply_to_user_id: null,
  //      in_reply_to_user_id_str: null,
  //      in_reply_to_screen_name: null,
  //      user: {
  //        id: 3,
  //        screen_name: 'meichen'
  //      },
  //      geo: null,
  //      coordinates: null,
  //      place: null,
  //      contributors: null,
  //      is_quote_status: false,
  //      retweet_count: 0,
  //      favorite_count: 2,
  //      favorited: false,
  //      retweeted: false,
  //      possibly_sensitive: false,
  //      lang: 'en' },
  //    { created_at: 'Sun Dec 31 17:55:09 +0000 2017',
  //      id: 947526552815726600,
  //      id_str: '947526552815726592',
  //      text: 'RT @GitKraken: There are loads of good tech conferences to attend in 2018. Check out our Top 7 https://t.co/l62Y4YgToS #DeveloperWeek #GitH…',
  //      truncated: false,
  //      source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
  //      in_reply_to_status_id: null,
  //      in_reply_to_status_id_str: null,
  //      in_reply_to_user_id: null,
  //      in_reply_to_user_id_str: null,
  //      in_reply_to_screen_name: null,
  //      user: {
  //        id: 4,
  //        screen_name: 'anna'
  //      },
  //      geo: null,
  //      coordinates: null,
  //      place: null,
  //      contributors: null,
  //      is_quote_status: false,
  //      retweet_count: 1,
  //      favorite_count: 0,
  //      favorited: false,
  //      retweeted: false,
  //      possibly_sensitive: false,
  //      lang: 'en' },
  //    { created_at: 'Sun Dec 31 17:45:00 +0000 2017',
  //      id: 947523999994712000,
  //      id_str: '947523999994712065',
  //      text: 'There are loads of good tech conferences to attend in 2018. Check out our Top 7 https://t.co/l62Y4YgToS… https://t.co/ffdhld9wxT',
  //      truncated: true,
  //      source: '<a href="http://www.hubspot.com/" rel="nofollow">HubSpot</a>',
  //      in_reply_to_status_id: null,
  //      in_reply_to_status_id_str: null,
  //      in_reply_to_user_id: null,
  //      in_reply_to_user_id_str: null,
  //      in_reply_to_screen_name: null,
  //      user: {
  //        id: 5,
  //        screen_name: 'devin'
  //      },
  //      geo: null,
  //      coordinates: null,
  //      place: null,
  //      contributors: null,
  //      is_quote_status: false,
  //      retweet_count: 1,
  //      favorite_count: 1,
  //      favorited: false,
  //      retweeted: false,
  //      possibly_sensitive: false,
  //      lang: 'en' } ],
  // search_metadata:
  //  { completed_in: 0.034,
  //    max_id: 947855171224244200,
  //    max_id_str: '947855171224244224',
  //    query: '%23developerweek',
  //    refresh_url: '?since_id=947855171224244224&q=%23developerweek&include_entities=1',
  //    count: 15,
  //    since_id: 0,
  //    since_id_str: '0' }
  //  }

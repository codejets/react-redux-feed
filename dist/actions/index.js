'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFeedThunkCreator = exports.UPDATE_PAGINATION = exports.ERROR_RECEIVE_FEED = exports.SUCCESS_RECEIVE_FEED = exports.REQUEST_FEED = undefined;
exports.requestFeedActionCreator = requestFeedActionCreator;
exports.receiveFeedActionCreator = receiveFeedActionCreator;
exports.errorFeedActionCreator = errorFeedActionCreator;

require('whatwg-fetch');

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _reducers = require('../reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_FEED = exports.REQUEST_FEED = 'REQUEST_FEED';
var SUCCESS_RECEIVE_FEED = exports.SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED';
var ERROR_RECEIVE_FEED = exports.ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED';
var UPDATE_PAGINATION = exports.UPDATE_PAGINATION = 'UPDATE_PAGINATION';

function requestFeedActionCreator(feedName, direction, endpoint) {
  return {
    type: REQUEST_FEED,
    payload: {
      feedName: feedName
    },
    meta: {
      direction: direction,
      endpoint: endpoint
    }
  };
}

function receiveFeedActionCreator(feedName, direction, items) {
  return {
    type: SUCCESS_RECEIVE_FEED,
    payload: {
      feedName: feedName,
      items: items
    },
    meta: {
      direction: direction
    }
  };
}

function errorFeedActionCreator(feedName, direction, error) {
  return {
    type: ERROR_RECEIVE_FEED,
    meta: {
      error: true,
      direction: direction
    },
    payload: {
      feedName: feedName,
      error: error
    }
  };
}

function updatePaginationDetails(feedName, direction, url, hasMoreItems) {
  return {
    type: UPDATE_PAGINATION,
    payload: {
      feedName: feedName,
      url: url,
      hasMoreItems: hasMoreItems
    },
    meta: {
      direction: direction
    }
  };
}

function getPaginationDetails(state, feedName) {
  return state[_reducers.FEED_REDUCER_KEY].paginations[feedName];
}

var fetchFeedThunkCreator = exports.fetchFeedThunkCreator = function fetchFeedThunkCreator() {
  var defaultGetItems = function defaultGetItems(items) {
    return items;
  };

  for (var _len = arguments.length, config = Array(_len), _key = 0; _key < _len; _key++) {
    config[_key] = arguments[_key];
  }

  var feedName = config[0];
  var direction = config[1];
  var _config$ = config[2];
  var getItems = _config$ === undefined ? defaultGetItems : _config$;
  var getInitialEndpoint = config[3];
  var updateEndpoint = config[4];
  var hasMoreItems = config[5];


  return function fetchFeedThunk(dispatch, getState) {
    var paginationDetails = getPaginationDetails(getState(), feedName);
    var endpoint;
    // check whether the feed is getting fetched
    // for the first time
    // feeds getting for fetched for the first time needs
    // to use the endpoint as passed by the user
    // subsequent fetches uses the endpoint as a result of updating
    // the endpoint from the previous response
    if (paginationDetails === undefined || paginationDetails === null) {
      endpoint = getInitialEndpoint(getState);
      if (!(0, _isUrl2.default)(endpoint)) {
        console.error('The initial endpoint ${endpoint} is not a valid url');
        return;
      }
    } else {
      endpoint = paginationDetails[direction].url;
    }

    // if the api source has already notified
    // there are no more items to fetch
    // we don't have any further actions
    // to dispatch
    if (paginationDetails && paginationDetails[direction] && !paginationDetails[direction].hasMoreItems) {
      return;
    }

    dispatch(requestFeedActionCreator(feedName, direction, endpoint));
    // console.log(`Endpoint called --> ${endpoint}`);
    fetch(endpoint).then(function (response) {
      if (!response.ok) {
        throw new Error('Request to feed endpoint not successful. Response status ' + response.status + ' returned for ' + response.url);
      }

      var headers = response.headers;

      return response.json().then(function (results) {
        var items = getItems(results);
        var nextPageUrl = updateEndpoint({ headers: headers, results: results, direction: direction });
        var moreItems = hasMoreItems({ headers: headers, results: results, direction: direction });
        // console.log(`
        //   New endpoint to update -> ${nextPageUrl} ${results} from ${endpoint}
        //   New items are present? ${moreItems}
        // `);
        dispatch(updatePaginationDetails(feedName, direction, nextPageUrl, moreItems));
        dispatch(receiveFeedActionCreator(feedName, direction, items));
      });
    }).catch(function dispatchFailureFetchAction(error) {
      dispatch(errorFeedActionCreator(feedName, direction, error.message));
    });
  };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchFeedThunkCreator = exports.UPDATE_PAGINATION = exports.ERROR_RECEIVE_FEED = exports.SUCCESS_RECEIVE_FEED = exports.REQUEST_FEED = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.requestFeedActionCreator = requestFeedActionCreator;
exports.receiveFeedActionCreator = receiveFeedActionCreator;
exports.errorFeedActionCreator = errorFeedActionCreator;

require('whatwg-fetch');

var _reducers = require('../reducers');

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
	var getEndpoint = config[3];
	var updateEndpoint = config[4];
	var hasMoreItems = config[5];


	return function fetchFeedThunk(dispatch, getState) {
		var paginationDetails = getPaginationDetails(getState(), feedName);
		var endpoint = getEndpoint(paginationDetails, direction);

		if (paginationDetails && paginationDetails[direction] && !paginationDetails[direction].hasMoreItems) {
			return;
		}

		dispatch(requestFeedActionCreator(feedName, direction, endpoint));

		fetch(endpoint).then(function (response) {
			if (!response.ok) {
				throw new Error({
					url: response.url,
					message: 'Not a successful request'
				});
			}

			try {
				var nextPageUrl = updateEndpoint(response.clone());
			} catch (e) {
				throw new Error('Update endpoint has a problem', e);
			}

			try {
				var _hasMoreItems = hasMoreItems(response.clone(), direction);
			} catch (e) {
				throw new Error('Your method to determine the existence of further pages is having a problem', e);
			}

			// `updateEndpoint` and `hasMoreItems` which are provided
			// by a user can return a Promise instead of a string or boolean
			Promise.all([Promise.resolve(nextPageUrl), Promise.resolve(_hasMoreItems)]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var nextPageUrl = _ref2[0];
				var _hasMoreItems = _ref2[1];

				dispatch(updatePaginationDetails(feedName, direction, nextPageUrl, _hasMoreItems));
			});

			return response.clone().json();
		}).then(function dispatchSuccesfulFetchAction(items) {
			items = getItems(items);
			dispatch(receiveFeedActionCreator(feedName, direction, items));
		}).catch(function dispatchFailureFetchAction(error) {
			dispatch(errorFeedActionCreator(feedName, direction, error.message));
		});
	};
};
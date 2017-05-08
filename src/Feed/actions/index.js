import 'whatwg-fetch';

const REQUEST_FEED = 'REQUEST_FEED'
const SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED'
const ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED'

export function requestFeedActionCreator (feedName) {
  return {
    type: REQUEST_FEED,
    payload: {
      feedName
    }
  }
}

export function receiveFeedActionCreator (feedName, items) {
  return {
    type: SUCCESS_RECEIVE_FEED,
    payload: {
      feedName,
      items
    }
  }
}

export function errorFeedActionCreator (feedName, error) {
  return {
    type: ERROR_RECEIVE_FEED,
    meta: {
      error: true
    },
    payload: {
      feedName,
      error
    }
  }
}

export var fetchFeedThunkCreator = function (...config) {
  var [feedName, api] = config
  return function fetchFeedThunk (dispatch) {
    dispatch(requestFeedActionCreator(feedName));

    // memoize results
    if (localStorage.getItem(`react-feed-playgroubd-${feedName}`)) {
      dispatch(receiveFeedActionCreator(feedName, JSON.parse(localStorage.getItem(`react-feed-playgroubd-${feedName}`))))
      return;
    }

    fetch(api)
    .then(function (response) {
      return response.json()
    })
    .then(function dispatchSuccesfulFetchAction (items) {
      dispatch(receiveFeedActionCreator(feedName, items));
      localStorage.setItem(`react-feed-playgroubd-${feedName}`, JSON.stringify(items));
    })
    .catch(function dispatchFailureFetchAction (error) {
      dispatch(errorFeedActionCreator(feedName, error))
    });
  }
}

export { REQUEST_FEED, SUCCESS_RECEIVE_FEED, ERROR_RECEIVE_FEED }

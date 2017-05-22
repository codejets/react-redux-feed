import 'whatwg-fetch';
import { FEED_REDUCER_KEY } from '../reducers';

export const REQUEST_FEED = 'REQUEST_FEED';
export const SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED';
export const ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED';
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';

export function requestFeedActionCreator(feedName, direction, endpoint) {
  return {
    type: REQUEST_FEED,
    payload: {
      feedName
    },
    meta: {
      direction,
      endpoint
    }
  };
}

export function receiveFeedActionCreator(feedName, direction, items) {
  return {
    type: SUCCESS_RECEIVE_FEED,
    payload: {
      feedName,
      items
    },
    meta: {
      direction
    }
  };
}

export function errorFeedActionCreator(feedName, direction, error) {
  return {
    type: ERROR_RECEIVE_FEED,
    meta: {
      error: true,
      direction
    },
    payload: {
      feedName,
      error
    }
  };
}

function updatePaginationDetails(feedName, direction, url, hasMoreItems) {
  return {
    type: UPDATE_PAGINATION,
    payload: {
      feedName,
      url,
      hasMoreItems
    },
    meta: {
      direction
    }
  };
}

function getPaginationDetails(state, feedName) {
  return state[FEED_REDUCER_KEY].paginations[feedName];
}

export var fetchFeedThunkCreator = function(...config) {
  var [feedName, direction, getEndpoint, updateEndpoint, hasMoreItems] = config;

  return function fetchFeedThunk(dispatch, getState) {
    var paginationDetails = getPaginationDetails(getState(), feedName);
    var endpoint = getEndpoint(paginationDetails, direction);

    if (
      paginationDetails &&
      paginationDetails[direction] &&
      !paginationDetails[direction].hasMoreItems
    ) {
      return;
    }

    dispatch(requestFeedActionCreator(feedName, direction, endpoint));

    // // memoize results
    // if (localStorage.getItem(`react-feed-playgroubd-${feedName}`)) {
    //   let cachedItems = JSON.parse(
    //     localStorage.getItem(`react-feed-playgroubd-${feedName}`)
    //   );
    //   dispatch(receiveFeedActionCreator(feedName, direction, cachedItems));
    //   return;
    // }

    fetch(endpoint)
      .then(function(response) {
        try {
          var nextPageUrl = updateEndpoint(response);
        } catch (e) {
          throw new Error('Update endpoint has a problem', e);
        }

        try {
          var _hasMoreItems = hasMoreItems(response, direction);
        } catch (e) {
          throw new Error('Update endpoint has a problem', e);
        }

        if (!response.ok) {
          throw new Error({
            url: response.url,
            message: 'Not a successful request'
          });
        }

        dispatch(
          updatePaginationDetails(
            feedName,
            direction,
            nextPageUrl,
            _hasMoreItems
          )
        );

        return response.json();
      })
      .then(function dispatchSuccesfulFetchAction(items) {
        dispatch(receiveFeedActionCreator(feedName, direction, items));
        // localStorage.setItem(
        //   `react-feed-playground-${feedName}`,
        //   JSON.stringify(items)
        // );
      })
      .catch(function dispatchFailureFetchAction(error) {
        dispatch(errorFeedActionCreator(feedName, direction, error));
      });
  };
};

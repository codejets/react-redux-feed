import { merge } from 'lodash';

const factory = types => {
  const [REQUEST, RECEIVE, ERROR, UPDATE] = types;

  var defaultPaginationDetails = {
    isFetching: false,
    url: '',
    hasMoreItems: false
  };

  var modifyIsFetching = function(state, feedName, direction, bool) {
    // after initial load of data we want to set the pagination
    // details for items below it for the next fetch
    if (direction === 'initial') {
      direction = 'below';
    }

    return merge({}, state, {
      [feedName]: {
        [direction]: {
          isFetching: bool
        }
      }
    });
  };

  var modifyEndpoints = function(
    state,
    feedName,
    direction,
    nextPageUrl,
    hasMoreItems
  ) {
    if (direction === 'initial') {
      direction = 'below';
    }
    return merge({}, state, {
      [feedName]: {
        [direction]: {
          ...defaultPaginationDetails,
          url: nextPageUrl,
          hasMoreItems
        }
      }
    });
  };

  return (state = {}, action) => {
    // which direction the user has requested to
    // load for new resources
    var feedName = action.payload && action.payload.feedName;
    var direction = (action.meta && action.meta.direction) || 'initial';
    switch (action.type) {
      case REQUEST:
        return modifyIsFetching(state, feedName, direction, true);
      case RECEIVE:
        return modifyIsFetching(state, feedName, direction, false);
      case UPDATE:
        return modifyEndpoints(
          state,
          feedName,
          direction,
          action.payload.url,
          action.payload.hasMoreItems
        );
      case ERROR:
        return modifyIsFetching(state, feedName, direction, false);
      default:
        return state;
    }
  };
};

export default factory;

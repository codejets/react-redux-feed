import React from 'react';
import { connect } from 'react-redux';
import { fetchFeedThunkCreator } from '../actions';
import { FEED_REDUCER_KEY } from '../reducers';
import Feed from './Feed';

var mapStateToProps = function(state, ownProps) {
  var feedName = ownProps.name;
  var isFetching = state.feeds.paginations[feedName]
    ? state.feeds.paginations[feedName].isFetching
    : false;
  // if the feed has been already mounted, our
  // redux store will have an corresponding state slice
  // for the feed
  if (state[FEED_REDUCER_KEY].entities[feedName]) {
    return {
      items: state.feeds.entities[feedName],
      isFetching,
      ...ownProps
    };
  } else {
    return {
      items: [],
      isFetching,
      ...ownProps
    };
  }
};

var mapDispatchToProps = function(dispatch, ownProps) {
  var feedName = ownProps.name;
  var { getEndpoint, updateEndpoint, hasMoreItems } = ownProps;
  return {
    fetchFeed(direction = 'initial') {
      dispatch(
        fetchFeedThunkCreator(
          feedName,
          direction,
          getEndpoint,
          updateEndpoint,
          hasMoreItems
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

import React from 'react'
import { connect } from 'react-redux'
import { fetchFeedThunkCreator } from '../actions'
import { FEED_REDUCER_KEY } from '../reducers'
import Feed from './Feed'

var mapStateToProps = function(state, ownProps) {
  var feedName = ownProps.name
  var isFetching = state.feeds.paginations[feedName]
    ? state.feeds.paginations[feedName].below.isFetching
    : false
  var moreItems = state.feeds.paginations[feedName]
    ? state.feeds.paginations[feedName].below.hasMoreItems
    : false

  // if the feed has been already mounted, our
  // redux store will have an corresponding state slice
  // for the feed
  if (state[FEED_REDUCER_KEY].entities[feedName]) {
    return {
      items: state.feeds.entities[feedName],
      isFetching,
      moreItems,
      ...ownProps
    }
  } else {
    return {
      items: [],
      isFetching,
      moreItems,
      ...ownProps
    }
  }
}

var mapDispatchToProps = function(dispatch, ownProps) {
  var feedName = ownProps.name
  var { getItems, getInitialEndpoint, updateEndpoint, hasMoreItems } = ownProps
  return {
    fetchFeed(direction = 'initial') {
      dispatch(
        fetchFeedThunkCreator(
          feedName,
          direction,
          getItems,
          getInitialEndpoint,
          updateEndpoint,
          hasMoreItems
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

import 'whatwg-fetch'
import isUrl from 'is-url'
import { FEED_REDUCER_KEY } from '../reducers'

export const REQUEST_FEED = 'REQUEST_FEED'
export const SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED'
export const ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED'
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'

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
  }
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
  }
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
  }
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
  }
}

function getPaginationDetails(state, feedName) {
  return state[FEED_REDUCER_KEY].paginations[feedName]
}

export var fetchFeedThunkCreator = function(...config) {
  var defaultGetItems = items => items
  var [
    feedName,
    direction,
    getItems = defaultGetItems,
    getInitialEndpoint,
    updateEndpoint,
    hasMoreItems
  ] = config

  console.log(config)

  return function fetchFeedThunk(dispatch, getState) {
    var paginationDetails = getPaginationDetails(getState(), feedName)
    var endpoint
    // check whether the feed is getting fetched
    // for the first time
    // feeds getting for fetched for the first time needs
    // to use the endpoint as passed by the user
    // subsequent fetches uses the endpoint as a result of updating
    // the endpoint from the previous response
    if (paginationDetails === undefined || paginationDetails === null) {
      endpoint = getInitialEndpoint(getState)
      if (!isUrl(endpoint)) {
        console.error('The initial endpoint ${endpoint} is not a valid url')
        return
      }
    } else {
      endpoint = paginationDetails[direction].url
    }

    // if the api source has already notified
    // there are no more items to fetch
    // we don't have any further actions
    // to dispatch
    if (
      paginationDetails &&
      paginationDetails[direction] &&
      !paginationDetails[direction].hasMoreItems
    ) {
      return
    }

    dispatch(requestFeedActionCreator(feedName, direction, endpoint))

    fetch(endpoint)
      .then(function(response) {
        if (!response.ok) {
          throw new Error({
            url: response.url,
            message: 'Not a successful request'
          })
        }

        try {
          var nextPageUrl = updateEndpoint(response.clone())
          if (!isUrl(endpoint)) {
            throw new Error(
              'The endpoint representing subsequent pagination,  ${nextPageUrl} is not a valid url'
            )
          }
        } catch (e) {
          throw new Error('Update endpoint has a problem', e)
        }

        try {
          var _hasMoreItems = hasMoreItems(response.clone(), direction)
        } catch (e) {
          throw new Error(
            'Your method to determine the existence of further pages is having a problem',
            e
          )
        }

        // `updateEndpoint` and `hasMoreItems` which are provided
        // by a user can return a Promise or a string or boolean
        Promise.all([
          Promise.resolve(nextPageUrl),
          Promise.resolve(_hasMoreItems)
        ]).then(function([nextPageUrl, _hasMoreItems]) {
          dispatch(
            updatePaginationDetails(
              feedName,
              direction,
              nextPageUrl,
              _hasMoreItems
            )
          )
        })

        return response.clone().json()
      })
      .then(function dispatchSuccesfulFetchAction(items) {
        items = getItems(items)
        dispatch(receiveFeedActionCreator(feedName, direction, items))
      })
      .catch(function dispatchFailureFetchAction(error) {
        dispatch(errorFeedActionCreator(feedName, direction, error.message))
      })
  }
}

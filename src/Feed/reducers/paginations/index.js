import { REQUEST_FEED, SUCCESS_RECEIVE_FEED, ERROR_RECEIVE_FEED } from '../../actions'

export default function feedPaginationreducer (state={}, action) {
  var feedName = action.payload && action.payload.feedName

  switch (action.type) {
    case REQUEST_FEED:
      return {
        ...state,
        [feedName]: {
          isFetching: true
        }
      }
    case SUCCESS_RECEIVE_FEED:
    case ERROR_RECEIVE_FEED:
      return {
        ...state,
        [feedName]: {
          isFetching: false
        }
      }
    default:
      return state
  }
}

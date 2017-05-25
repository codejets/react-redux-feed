import { REQUEST_FEED, SUCCESS_RECEIVE_FEED, ERROR_RECEIVE_FEED } from '../../actions'

export default function feedErrorReducer (state={}, action) {
  var feedName = action.payload && action.payload.feedName

  switch (action.type) {
    case REQUEST_FEED:
    case SUCCESS_RECEIVE_FEED:
      return {
        ...state,
        [feedName]: {}
      }
    case ERROR_RECEIVE_FEED:
      return {
        ...state,
        [feedName]: action.payload.error
      }
    default:
      return state
  }
}

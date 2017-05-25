import { SUCCESS_RECEIVE_FEED } from '../../actions';

export default function feedEntitiesReducer(state = {}, action) {
  var feedName = action.payload && action.payload.feedName;
  var existingItems = state[feedName] || [];
  switch (action.type) {
    case SUCCESS_RECEIVE_FEED:
      return {
        ...state,
        [feedName]: existingItems.concat(action.payload.items)
      };
    default:
      return state;
  }
}

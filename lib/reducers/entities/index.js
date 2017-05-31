import { SUCCESS_RECEIVE_FEED } from '../../actions';
// import { uniqBy } from 'lodash'

export default function feedEntitiesReducer(state = {}, action) {
  var feedName = action.payload && action.payload.feedName;
  var existingItems = state[feedName] || [];
  switch (action.type) {
    case SUCCESS_RECEIVE_FEED:

      // console.log(`
      //   Number of available items -> ${existingItems.length}
      //   Number of new items -> ${action.payload.items.length}
      //   Number of unique items -> ${uniqBy(existingItems.concat(action.payload.items), 'id').length}
      // `);

      return {
        ...state,
        [feedName]: existingItems.concat(action.payload.items)
      };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import entities from './entities';
import paginations from './paginations';
import errors from './errors';

export default combineReducers({
  entities,
  paginations,
  errors
});

export const FEED_REDUCER_KEY = 'feeds';

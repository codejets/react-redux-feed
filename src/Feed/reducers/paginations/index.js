import {
  REQUEST_FEED,
  SUCCESS_RECEIVE_FEED,
  ERROR_RECEIVE_FEED,
  UPDATE_PAGINATION
} from '../../actions';

import PaginationReducerFactory from './factory';

export default PaginationReducerFactory([
  'REQUEST_FEED',
  'SUCCESS_RECEIVE_FEED',
  'ERROR_RECEIVE_FEED',
  'UPDATE_PAGINATION'
]);

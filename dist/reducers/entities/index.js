'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = feedEntitiesReducer;

var _actions = require('../../actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { uniqBy } from 'lodash'

function feedEntitiesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var feedName = action.payload && action.payload.feedName;
  var existingItems = state[feedName] || [];
  switch (action.type) {
    case _actions.SUCCESS_RECEIVE_FEED:

      // console.log(`
      //   Number of available items -> ${existingItems.length}
      //   Number of new items -> ${action.payload.items.length}
      //   Number of unique items -> ${uniqBy(existingItems.concat(action.payload.items), 'id').length}
      // `);

      return _extends({}, state, _defineProperty({}, feedName, existingItems.concat(action.payload.items)));
    default:
      return state;
  }
}
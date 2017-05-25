'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = feedErrorReducer;

var _actions = require('../../actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function feedErrorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var feedName = action.payload && action.payload.feedName;

  switch (action.type) {
    case _actions.REQUEST_FEED:
    case _actions.SUCCESS_RECEIVE_FEED:
      return _extends({}, state, _defineProperty({}, feedName, {}));
    case _actions.ERROR_RECEIVE_FEED:
      return _extends({}, state, _defineProperty({}, feedName, action.payload.error));
    default:
      return state;
  }
}
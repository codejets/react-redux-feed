'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(types) {
  var _types = _slicedToArray(types, 4);

  var REQUEST = _types[0];
  var RECEIVE = _types[1];
  var ERROR = _types[2];
  var UPDATE = _types[3];


  var defaultPaginationDetails = {
    isFetching: false,
    url: '',
    hasMoreItems: false
  };

  var modifyIsFetching = function modifyIsFetching(state, feedName, direction, bool) {
    // after initial load of data we want to set the pagination
    // details for items below it for the next fetch
    if (direction === 'initial') {
      direction = 'below';
    }

    return (0, _lodash.merge)({}, state, _defineProperty({}, feedName, _defineProperty({}, direction, {
      isFetching: bool
    })));
  };

  var modifyEndpoints = function modifyEndpoints(state, feedName, direction, nextPageUrl, hasMoreItems) {
    if (direction === 'initial') {
      direction = 'below';
    }
    return (0, _lodash.merge)({}, state, _defineProperty({}, feedName, _defineProperty({}, direction, _extends({}, defaultPaginationDetails, {
      url: nextPageUrl,
      hasMoreItems: hasMoreItems
    }))));
  };

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    // which direction the user has requested to
    // load for new resources
    var feedName = action.payload && action.payload.feedName;
    var direction = action.meta && action.meta.direction || 'initial';
    switch (action.type) {
      case REQUEST:
        return modifyIsFetching(state, feedName, direction, true);
      case RECEIVE:
        return modifyIsFetching(state, feedName, direction, false);
      case UPDATE:
        return modifyEndpoints(state, feedName, direction, action.payload.url, action.payload.hasMoreItems);
      case ERROR:
        return modifyIsFetching(state, feedName, direction, false);
      default:
        return state;
    }
  };
};

exports.default = factory;
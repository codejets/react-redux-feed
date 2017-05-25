'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../../actions');

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _factory2.default)(['REQUEST_FEED', 'SUCCESS_RECEIVE_FEED', 'ERROR_RECEIVE_FEED', 'UPDATE_PAGINATION']);
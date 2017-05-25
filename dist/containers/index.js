'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _reducers = require('../reducers');

var _Feed = require('./Feed');

var _Feed2 = _interopRequireDefault(_Feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var feedName = ownProps.name;
	var isFetching = state.feeds.paginations[feedName] ? state.feeds.paginations[feedName].below.isFetching : false;
	var moreItems = state.feeds.paginations[feedName] ? state.feeds.paginations[feedName].below.hasMoreItems : false;

	// if the feed has been already mounted, our
	// redux store will have an corresponding state slice
	// for the feed
	if (state[_reducers.FEED_REDUCER_KEY].entities[feedName]) {
		return _extends({
			items: state.feeds.entities[feedName],
			isFetching: isFetching,
			moreItems: moreItems
		}, ownProps);
	} else {
		return _extends({
			items: [],
			isFetching: isFetching,
			moreItems: moreItems
		}, ownProps);
	}
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	var feedName = ownProps.name;
	var getItems = ownProps.getItems;
	var getEndpoint = ownProps.getEndpoint;
	var updateEndpoint = ownProps.updateEndpoint;
	var hasMoreItems = ownProps.hasMoreItems;

	return {
		fetchFeed: function fetchFeed() {
			var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';

			dispatch((0, _actions.fetchFeedThunkCreator)(feedName, direction, getItems, getEndpoint, updateEndpoint, hasMoreItems));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Feed2.default);
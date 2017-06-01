'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _circle = require('react-icons/lib/fa/circle');

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var centerAlignLoader = {
  width: '30px',
  margin: 'auto'
};

var InfiniteLoadingStream = function (_Component) {
  _inherits(InfiniteLoadingStream, _Component);

  function InfiniteLoadingStream() {
    _classCallCheck(this, InfiniteLoadingStream);

    return _possibleConstructorReturn(this, (InfiniteLoadingStream.__proto__ || Object.getPrototypeOf(InfiniteLoadingStream)).apply(this, arguments));
  }

  _createClass(InfiniteLoadingStream, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var items = _props.items;
      var _props$itemHeight = _props.itemHeight;
      var itemHeight = _props$itemHeight === undefined ? 130 : _props$itemHeight;
      var moreItems = _props.moreItems;
      var isFetching = _props.isFetching;
      var error = _props.error;
      var itemComponent = _props.itemComponent;
      var loaderComponent = _props.loaderComponent;
      var errorComponent = _props.errorComponent;
      var noItemsComponent = _props.noItemsComponent;
      var fetchFeed = _props.fetchFeed;

      // If there are more items to be loaded then add
      // an extra row to hold a loading indicator or
      // the show an item to say that there is no more
      // items to load

      var rowCount = items.length + 1;

      var loadNextPage = function loadNextPage() {
        if (moreItems) {
          fetchFeed('below');
        }
      };

      // Only load 1 page of items at a time.
      // Pass an empty callback to InfiniteLoader in case it asks us
      // to load more than once.
      var loadMoreRows = isFetching || !moreItems ? function () {} : loadNextPage;

      // Every row is loaded except for our loading indicator row.
      var isRowLoaded = function isRowLoaded(index) {
        return !!items[index];
      };

      // Render a list item or a loading indicator.
      var rowRenderer = function rowRenderer(_ref) {
        var index = _ref.index;
        var key = _ref.key;
        var style = _ref.style;

        var content;
        var loaderContent = loaderComponent ? _react2.default.createElement(
          'div',
          { style: centerAlignLoader },
          loaderComponent()
        ) : 'Loading...';

        var errorContent = errorComponent ? _react2.default.createElement(
          'div',
          { style: { textAlign: 'center' } },
          errorComponent()
        ) : 'Error Loading Feed';

        var noItemContent = noItemsComponent ? _react2.default.createElement(
          'div',
          { style: { textAlign: 'center' } },
          noItemsComponent()
        ) : 'No more items';

        if (isRowLoaded(index)) {
          content = itemComponent(items[index]);
        } else {
          if (isFetching) {
            content = loaderContent;
          } else {
            if (error && error.length > 0) {
              content = errorContent;
            } else {
              content = noItemContent;
            }
          }
        }

        return _react2.default.createElement(
          'div',
          { key: key, style: style },
          content
        );
      };

      return _react2.default.createElement(
        _reactVirtualized.InfiniteLoader,
        {
          isRowLoaded: isRowLoaded,
          loadMoreRows: loadMoreRows,
          rowCount: rowCount
        },
        function (_ref2) {
          var onRowsRendered = _ref2.onRowsRendered;
          var registerChild = _ref2.registerChild;
          return _react2.default.createElement(
            _reactVirtualized.AutoSizer,
            null,
            function (_ref3) {
              var height = _ref3.height;
              var width = _ref3.width;
              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactVirtualized.List, {
                  width: width,
                  height: height - 140,
                  ref: registerChild,
                  rowCount: rowCount,
                  rowHeight: itemHeight,
                  onRowsRendered: onRowsRendered,
                  rowRenderer: rowRenderer
                })
              );
            }
          );
        }
      );
    }
  }]);

  return InfiniteLoadingStream;
}(_react.Component);

exports.default = InfiniteLoadingStream;
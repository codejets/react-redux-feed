import React, { Component } from 'react';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';

class InfiniteLoadingStream extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      moreItems,
      loadNextPage,
      isNextPageLoading,
      itemComponent
    } = this.props;

    // If there are more items to be loaded then add
    // an extra row to hold a loading indicator or
    // the show an item to say that there is no more
    // items to load
    const rowCount = items.length + 1;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us
    // to load more than once.
    const loadMoreRows = isNextPageLoading || !moreItems
      ? () => {}
      : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => {
      return !!items[index];
    };

    // Render a list item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => {
      let content;
      if (!isRowLoaded({ index })) {
        return (
          <div key={key} style={style}>
            {moreItems ? 'Loading....' : ''}
          </div>
        );
      } else {
        return (
          <div key={key} style={style}>
            {itemComponent(items[index])}
          </div>
        );
      }
    };

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}>
        {({ onRowsRendered }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={rowCount}
                rowHeight={110}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default InfiniteLoadingStream;

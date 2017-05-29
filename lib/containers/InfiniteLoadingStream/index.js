import React, { Component, isValidElement } from 'react'
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized'
import glamorous from 'glamorous'

const { Div } = glamorous

const centerAlignLoader = {
  width: '30px',
  margin: 'auto'
}

class InfiniteLoadingStream extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      items,
      itemHeight = 130,
      moreItems,
      loadNextPage,
      isNextPageLoading,
      itemComponent,
      loaderComponent
    } = this.props

    // If there are more items to be loaded then add
    // an extra row to hold a loading indicator or
    // the show an item to say that there is no more
    // items to load
    const rowCount = items.length + 1

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us
    // to load more than once.
    const loadMoreRows = isNextPageLoading || !moreItems
      ? () => {}
      : loadNextPage

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => {
      return !!items[index]
    }

    // Render a list item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => {
      let content

      if (isRowLoaded({ index })) {
        content = itemComponent(items[index])
      } else {
        content =
          moreItems &&
          <Div {...centerAlignLoader}>
            {loaderComponent ? loaderComponent() : 'Loading'}
          </Div>
      }

      return (
        <div key={key} style={style}>
          {content}
        </div>
      )
    }

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <div>
                <List
                  width={width}
                  height={height}
                  ref={registerChild}
                  rowCount={rowCount}
                  rowHeight={itemHeight}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }
}

export default InfiniteLoadingStream

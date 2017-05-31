import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import getFeedConfig from '../../configs/Subreddit'
import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

export default class SubRedditFeeds extends Component {
  render() {
    var { keywords } = this.props
    return (
      <Div
        {...feedsContainerStyle}
        {...{ columns: `300px ${keywords.length}` }}
      >
        {keywords.map(function renderSubRedditFeeds(keyword) {
          return (
            <Feed
              key={keyword}
              {...getFeedConfig(keyword)}
            />
          )
        })}
      </Div>
    )
  }
}

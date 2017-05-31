import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import { Div } from 'glamorous'
import getFeedConfig from '../../configs/Tweets'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

export default class TwitterFeeds extends Component {
  render() {
    var { keywords } = this.props
    return (
      <Div
        {...feedsContainerStyle}
        {...{ columns: `300px ${keywords.length}` }}
      >
        {keywords.map(function renderTwitterFeeds(keyword) {
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

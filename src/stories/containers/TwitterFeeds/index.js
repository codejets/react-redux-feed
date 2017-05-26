import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import Gist from '../../components/Gist'
import Tweet from '../../components/Tweet'
import TweetIcon from 'react-icons/lib/fa/twitter'
import getPaginationConfigs from '../../configs/Tweets'

import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

var createTweetsFeedConfig = function(keyword) {
  return {
    name: `${keyword}Tweets`,
    itemComponent: Tweet,
    itemIdKey: 'id_str',
    itemHeight: 120,
    ...getPaginationConfigs(keyword)
  }
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
              {...createTweetsFeedConfig(keyword)}
              headerIcon={TweetIcon}
            />
          )
        })}
      </Div>
    )
  }
}

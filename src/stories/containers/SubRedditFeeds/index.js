import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import Subreddit from '../../components/Subreddit'
import redditIcon from 'react-icons/lib/fa/reddit'
import getPaginationConfigs from '../../configs/Subreddit'

import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

var createSubredditFeedConfig = function(keyword) {
  var name = `${keyword} Subreddit`
  return {
    name,
    itemComponent: Subreddit,
    headerComponent: function() {
      return Header({ name, iconComponent: redditIcon })
    },
    itemIdKey: 'id_str',
    itemHeight: 120,
    loaderComponent: function() {
      return <Spinner spinnerName="pulse" />
    },
    ...getPaginationConfigs(keyword)
  }
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
              {...createSubredditFeedConfig(keyword)}
              headerIcon={redditIcon}
            />
          )
        })}
      </Div>
    )
  }
}

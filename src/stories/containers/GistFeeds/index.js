import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import Header from '../../components/Header'
import Gist from '../../components/Gist'
import GistIcon from 'react-icons/lib/go/gist'
import getPaginationConfigs from '../../configs/Gists'

import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

var createGistFeedConfig = function(githubUserName) {
  var name = `${githubUserName} Gists`
  return {
    name,
    itemComponent: Gist,
    headerComponent: function() {
      return Header({ name, iconComponent: GistIcon })
    },
    itemIdKey: 'id',
    ...getPaginationConfigs(githubUserName)
  }
}

export default class GistFeeds extends Component {
  render() {
    var { gistUsers } = this.props
    return (
      <Div
        {...feedsContainerStyle}
        {...{ columns: `300px ${gistUsers.length}` }}
      >
        {gistUsers.map(function renderGistFeeds(githubUser) {
          return <Feed key={githubUser} {...createGistFeedConfig(githubUser)} />
        })}
      </Div>
    )
  }
}

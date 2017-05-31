import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import getFeedConfig from '../../configs/Gists'
import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
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
          return <Feed key={githubUser} {...getFeedConfig(githubUser)} />
        })}
      </Div>
    )
  }
}

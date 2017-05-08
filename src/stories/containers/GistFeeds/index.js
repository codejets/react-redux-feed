import React, { Component } from 'react';
import { Feed } from '../../../Feed'
import Gist from '../../components/Gist'
import GistIcon from 'react-icons/lib/go/gist'

import { Div } from 'glamorous'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  'margin': '30px'
}

const getPublicGistForGithubuser = function (user) {
  return `https://api.github.com/users/${user}/gists`;
};

var createGistFeedConfig = function (githubUserName) {
  return {
    name: `${githubUserName}Gists`,
    api:  getPublicGistForGithubuser(githubUserName),
    itemComponent: Gist,
    itemIdKey: 'id'
  }
};

export default class GistFeeds extends Component {
  render () {
    var { gistUsers } = this.props;
    return (
      <Div {...feedsContainerStyle} {...{columns: `300px ${gistUsers.length}`}}>
        {gistUsers.map(function renderGistFeeds (githubUser) {
          return (
            <Feed key={githubUser} {...createGistFeedConfig(githubUser)} headerIcon={GistIcon} />
          )
        })}
      </Div>
    )
  }
}
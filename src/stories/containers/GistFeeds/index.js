import React, { Component } from 'react'
import { Feed } from 'react-redux-feed'
import Gist from '../../components/Gist'
import GistIcon from 'react-icons/lib/go/gist'
import getPaginationConfigs from '../../modules/paginations/Gists/config'

import { Div } from 'glamorous'

var feedsContainerStyle = {
	width: '100%',
	columns: '300px 3',
	margin: '30px'
}

const getPublicGistForGithubuser = function(user) {
	return `https://api.github.com/users/${user}/gists`
}

var createGistFeedConfig = function(githubUserName) {
	return {
		name: `${githubUserName}Gists`,
		itemComponent: Gist,
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
					return (
						<Feed
							key={githubUser}
							{...createGistFeedConfig(githubUser)}
							headerIcon={GistIcon}
						/>
					)
				})}
			</Div>
		)
	}
}

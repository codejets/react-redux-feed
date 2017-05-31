import React from 'react'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import Gist from '../../components/Gist'
import GistIcon from 'react-icons/lib/go/gist'
import parseLinkHeader from 'parse-link-header'
import { isNil } from 'lodash'

const API_ENDPOINT = function(user) {
	return `https://api.github.com/users/${user}/gists`
}

export default function getFeedConfig(user) {
  var name = `${user}Gists`
	return {
    name,
    itemComponent: Gist,
    itemIdKey: 'id',
    itemHeight: 120,
    headerComponent: function() {
      return Header({ name, iconComponent: GistIcon })
    },
    loaderComponent: function() {
      return <Spinner spinnerName="pulse" fadeIn={0} />
    },
		getInitialEndpoint(getState) {
			return API_ENDPOINT(user)
		},
		updateEndpoint(response, direction = 'initial') {
			var headers = response.headers
			var details = parseLinkHeader(headers.get('Link'))
			if (isNil(details) || !details.next) {
				return ''
			}

			return details.next.url
		},
		hasMoreItems(response, direction = 'initial') {
			if (isNil(response)) {
				return false
			}

			var headers = response.headers
			var details = parseLinkHeader(headers.get('Link'))
			var moreItems

			// does not have details
			if (isNil(details) || !details.last) {
				moreItems = false
			} else if (response.url === details.last.url) {
				moreItems = false
			} else if (response.url !== details.last.url) {
				moreItems = true
			}

			return moreItems
		}
	}
}

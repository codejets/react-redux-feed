import { isNil } from 'lodash'

const API_ENDPOINT = function(keyword) {
	return `http://localhost:3000/tweets/${keyword}`
}

export default function getPaginationConfigs(keyword) {
	return {
		getItems(searchResults) {
			if (isNil(searchResults)) {
				return []
			} else {
				return searchResults.statuses
			}
		},
		getEndpoint(paginationState, direction = 'initial') {
			if (direction === 'initial') {
				return API_ENDPOINT(keyword)
			} else {
				return paginationState[direction].url
			}
		},
		updateEndpoint(response, direction = 'initial') {
			return response.json().then(function(tweets) {
				return `${API_ENDPOINT(keyword)}${tweets.search_metadata.next_results}`
			})
		},
		hasMoreItems(response, direction = 'initial') {
			if (isNil(response)) {
				return false
			}

			return response.json().then(function(searchResults) {
				return searchResults.search_metadata.next_results &&
					searchResults.search_metadata.next_results.length > 0
					? true
					: false
			})

			return false
		}
	}
}

import { isNil } from 'lodash'

const API_ENDPOINT = function(keyword) {
  return `https://dist-dfwbzmpgwb.now.sh/api/tweets/${keyword}`
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
    getInitialEndpoint(getState) {
      return API_ENDPOINT(keyword)
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

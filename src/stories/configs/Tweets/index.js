import React from 'react'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import Tweet from '../../components/Tweet'
import TweetIcon from 'react-icons/lib/fa/twitter'
import { isNil } from 'lodash'

const API_ENDPOINT = function(keyword) {
  return `http://localhost:3000/tweets/${keyword}`
}

export default function getFeedConfig(keyword) {
  var name = `${keyword}Tweets`
  return {
    name,
    itemComponent: Tweet,
    itemIdKey: 'id_str',
    itemHeight: 120,
    headerComponent: function() {
      return Header({ name, iconComponent: TweetIcon })
    },
    loaderComponent: function() {
      return <Spinner spinnerName="pulse" fadeIn={0} />
    },
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
    updateEndpoint({results}) {
      var newEndpoint = `${API_ENDPOINT(keyword)}${results.search_metadata.next_results}`

      return newEndpoint
    },
    hasMoreItems({results}) {
      if (isNil(results)) {
        return false
      }

      return results.search_metadata.next_results &&
        results.search_metadata.next_results.length > 0
        ? true
        : false
    }
  }
}

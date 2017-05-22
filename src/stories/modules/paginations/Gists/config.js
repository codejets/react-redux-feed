import parseLinkHeader from 'parse-link-header';
import { isNil } from 'lodash';

const API_ENDPOINT = function(user) {
  return `https://api.github.com/users/${user}/gists`;
};

export default function getPaginationConfigs(user) {
  return {
    getEndpoint(paginationState, direction = 'initial') {
      if (direction === 'initial') {
        return API_ENDPOINT(user);
      } else {
        return paginationState[direction].url;
      }
    },
    updateEndpoint(response, direction = 'initial') {
      var headers = response.headers;
      var details = parseLinkHeader(headers.get('Link'));
      if (isNil(details) || !details.next) {
        return '';
      }

      return details.next.url;
    },
    hasMoreItems(response, direction = 'initial') {
      if (isNil(response)) {
        return false;
      }

      var headers = response.headers;
      var details = parseLinkHeader(headers.get('Link'));
      var moreItems;

      // does not have details
      if (isNil(details) || !details.last) {
        moreItems = false;
      } else if (response.url === details.last.url) {
        moreItems = false;
      } else if (response.url !== details.last.url) {
        moreItems = true;
      }

      return moreItems;
    }
  };
}

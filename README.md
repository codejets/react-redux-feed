# React Redux Feed

*The list and the items in them have distinct essence.*

This library aims to manage all attributes of a list – loading items from an endpoint, error handling, pagination, filtering, search, etc. while providing the user to seamlessly take any action they want on the items.

This separation of concern prevent redundant code for multiple feeds in your app. It also provides a well-thought data shape to your redux store.

## Getting Started

The module is not published yet. So, for now we can clone the repo and use it as a starter kit. The repo itself was created by [create-react-app](https://github.com/facebookincubator/create-react-app), so the folder structure shouldn't be too unfamiliar. Once we hit a comprehensive feature set we are planning to publish it on npm.

```javascript
import Feed from './Feed'
import SimpleItem from './SimpleItem'

function SimpleFeed (props) {
  return (
    <Feed
      name='simple',
      api='url-to-load-data'
      itemComponent={SimpleItem}
      itemIdKey='id'
    />
  )
}
```

You can view a demo which loads gists for a user.

```
yarn
yarn run storybook
```

If you don't have yarn installed, this [guide](https://yarnpkg.com/en/docs/getting-started) will help you.

-  `name (string)` - An app can consist multiple feeds and each field must have a unique name

-  `api (string | url)` - Valid url to load data from

-  `itemComponent (React Component)` - A React component representing an item in the feed

-  `itemIdKey (string)` - Each item must have a unique identifier. Provide the `key` which belongs to an item data shape and can uniquely point to an item in the list.

### Redux Data Shape

```json
{
  "feeds": {
    "entities": {
      "simple": [{
          "data": "item"
        }]
    },
    "paginations": {
      "simple": {
        "isFetching": false
      }
    },
    "errors": {
      "simple": {}
    }
  }
}
```

## Potential Features
-  Support virtualisation to support as many items as needed
-  Load feeds from dynamically generated endpoints
-  Lifecycle hooks for feed
-  Establish relationships between different feeds
-  Dispatch actions if any item in a feed matches a criteria
-  Group items in a feed
-  Support async search for a feed

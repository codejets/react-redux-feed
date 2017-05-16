import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Provider from './decorators/reduxStore';
import GistFeeds from './containers/GistFeeds';

import Typography from 'typography';
import bootstrap from './typography-theme-bootstrap';

const typography = new Typography(bootstrap);

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();

storiesOf('Feed', module)
  .addDecorator(function(story) {
    return <Provider story={story()} />;
  })
  .add('Public Gists', function() {
    return <GistFeeds gistUsers={['gaearon', 'codejets', 'tanish2k']} />;
  });

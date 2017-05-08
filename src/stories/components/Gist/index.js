import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Div, A } from 'glamorous';

var descriptionStyle = {
  fontWeight: 700
}

var descriptionLink = {
  textDecoration: 'none',
  color: '#333333'
}

var metaStyle = {
  fontSize: '12px',
  position: 'relative'
}

var commitsLinkStyle = {
  position: 'absolute',
  right: '20px',
  color: '#666666',
  textDecoration: 'none'
}

export default function Gist (props) {
  var { description, id, html_url, created_at } = props

  var dateString = distanceInWordsToNow(created_at);
  description = description && description.length > 0 ? description : `A nameless gist`

  return (
    <div>
      <Div {...descriptionStyle}>
          {description}
      </Div>
      <Div {...metaStyle}>
        <span>
          <A {...descriptionLink} target='_blank' href={html_url}>
            {dateString}
          </A>
        </span>
        <span>
          <A href={`${html_url}/commits`} {...commitsLinkStyle}>
            Commits
          </A>
        </span>
      </Div>
    </div>

  )
}

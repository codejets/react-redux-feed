import React from 'react'
import { H2 } from 'glamorous'

const headerStyle = {
  borderBottom: '1px solid whitesmoke',
  padding: '20px'
}
{
}

export default function Header({ name, iconComponent }) {
  return (
    <H2 {...headerStyle}>
      {iconComponent()}{' '}
      {name}
    </H2>
  )
}

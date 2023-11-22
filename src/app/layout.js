import React from 'react'
import { ApolloWrapper } from '../lib/apollo-wrapper'
import PropTypes from 'prop-types'

/**
 * RootLayout component.
 * @param {{children: React.ReactNode}} props - The props.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children ? <ApolloWrapper>{children}</ApolloWrapper> : null}</body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node
}

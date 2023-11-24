import PropTypes from 'prop-types'
import { ApolloWrapper } from '../lib/apollo-wrapper'
import React from 'react'
import { AxiomWebVitals } from 'next-axiom'

/**
 * @param {{ children: React.ReactNode }} props
 */
function RootLayout({ children }) {
  return (
    <ApolloWrapper>
      <html lang="en">
        <AxiomWebVitals />
        <body>{children}</body>
      </html>
    </ApolloWrapper>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node
}

export default RootLayout

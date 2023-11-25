import PropTypes from 'prop-types'
import { ApolloWrapper } from '../lib/apollo-wrapper'
import { AxiomWebVitals } from 'next-axiom'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'

/**
 * @param {{ children: React.ReactNode }} props
 */
function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ApolloWrapper>
        <html lang="en">
          <AxiomWebVitals />
          <body>{children}</body>
        </html>
      </ApolloWrapper>
    </ClerkProvider>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node
}

export default RootLayout

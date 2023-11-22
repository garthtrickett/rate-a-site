'use client'
import PropTypes from 'prop-types'
import { ApolloLink, HttpLink } from '@apollo/client'
import React from 'react'
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient () {
  const httpLink = new HttpLink({
    // https://studio.apollographql.com/public/spacex-l4uc6p/
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql'
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true
          }),
          httpLink
        ])
        : httpLink
  })
}

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}

ApolloWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

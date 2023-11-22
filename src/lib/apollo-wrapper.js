'use client'
import PropTypes from 'prop-types'
import { ApolloLink, HttpLink } from '@apollo/client'
import React from 'react'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'
import { setVerbosity } from 'ts-invariant'

setVerbosity('debug')

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    fetchOptions: { cache: 'no-store' }
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
 * ApolloWrapper component.
 * @param {{children: React.ReactNode}} props - The props.
 */
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}

ApolloWrapper.propTypes = {
  children: PropTypes.node
}

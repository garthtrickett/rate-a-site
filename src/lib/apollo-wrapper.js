'use client'
import React from 'react'
import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr'

import { SchemaLink } from '@apollo/client/link/schema'

import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { setVerbosity } from 'ts-invariant'
import { schema } from '../app/api/graphql/schema'
import PropTypes from 'prop-types'

// Turn this off on production?
setVerbosity('debug')
loadDevMessages()
loadErrorMessages()

// If its SSR Schemalink is used otherwise httpLink
/**
 * @param {{ children: React.ReactNode }} props
 */
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )

  function makeClient() {
    const httpLink = new HttpLink({
      uri: '/api/graphql'
    })

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === 'undefined' ? new SchemaLink({ schema }) : httpLink
    })
  }
}

ApolloWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

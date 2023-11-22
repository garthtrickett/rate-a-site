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
import { delayLink } from './delayLink'
import { schema } from '../app/api/graphql/schema'
import PropTypes from 'prop-types'

setVerbosity('debug')
loadDevMessages()
loadErrorMessages()

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
      link: delayLink.concat(
        typeof window === 'undefined' ? new SchemaLink({ schema }) : httpLink
      )
    })
  }
}

ApolloWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from 'graphql-tag'

export const dynamic = 'force-dynamic'

const query = gql`
  query {
    launchLatest {
      mission_name
    }
  }
`

export default function PollPage() {
  const { data } = useSuspenseQuery(query)

  return <div>{data.launchLatest.mission_name}</div>
}

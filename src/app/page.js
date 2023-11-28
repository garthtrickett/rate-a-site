'use client'
import React from 'react'
import { useLogger } from 'next-axiom'
// import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql, useMutation } from '@apollo/client'
import { UserButton } from '@clerk/nextjs'
export const runtime = 'edge' // 'nodejs' is the default

// const QUERY = gql`
//   query getData($organisationId: Int!) {
//     organisation(id: $organisationId) {
//       id
//       name
//       professionals {
//         id
//         name
//       }
//     }
//   }
// `

const ADD_PROFESSIONAL = gql`
  mutation addProfessional($name: String!, $organisationId: Int!) {
    addProfessionalToOrganisation(
      name: $name
      organisationId: $organisationId
    ) {
      id
      name
      professionals {
        id
        name
      }
    }
  }
`

export const dynamic = 'force-dynamic'

export default function Page() {
  // const { data } = useSuspenseQuery(QUERY, {
  //   variables: { organisationId: 3 }
  // })

  // Example Logging
  const log = useLogger()
  log.debug('Component Log Example', { userId: 42 })

  const [addProfessional, { data }] = useMutation(ADD_PROFESSIONAL)
  console.log(data)

  const handleAddProfessional = () => {
    addProfessional({
      variables: { name: 'New Professional', organisationId: 3 }
    })
  }

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <button onClick={handleAddProfessional}>Add Professional</button>
    </div>
  )
}

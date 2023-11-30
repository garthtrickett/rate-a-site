'use client'
import React from 'react'
import { useLogger } from 'next-axiom'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql, useMutation } from '@apollo/client'
import { UserButton } from '@clerk/nextjs'
import { Button } from '../components/ui/Button'
import HeroHeader from '../components/pages/hero'

export const runtime = 'edge' // 'nodejs' is the default
const QUERY = gql`
  query getData($organisationId: Int!) {
    organisation(id: $organisationId) {
      id
      name
      professionals {
        id
        name
      }
    }
  }
`

const REMOVE_PROFESSIONAL_FROM_ORGANISATION = gql`
  mutation removeProfessional($professionalId: Int!, $organisationId: Int!) {
    removeProfessionalFromOrganisation(
      professionalId: $professionalId
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

const CREATE_PROFESSIONAL_AND_ADD_TO_ORGANISATION = gql`
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
  const { data: organisationData } = useSuspenseQuery(QUERY, {
    // Rename this to organisationData
    variables: { organisationId: 3 }
  })
  console.log(organisationData)

  // Example Logging
  const log = useLogger()
  log.debug('Component Log Example', { userId: 42 })

  const [addProfessional, { data: addProfessionalData }] = useMutation(
    // Rename this to addProfessionalData
    CREATE_PROFESSIONAL_AND_ADD_TO_ORGANISATION
  )
  console.log(addProfessionalData)

  const [removeProfessional] = useMutation(
    REMOVE_PROFESSIONAL_FROM_ORGANISATION
  ) // Add this line

  const handleAddProfessional = () => {
    addProfessional({
      variables: { name: 'New Professional', organisationId: 3 }
    })
  }

  /**
   * Handles the removal of a professional from an organisation.
   * @param {number} professionalId - The ID of the professional to be removed.
   */
  const handleRemoveProfessional = professionalId => {
    // Add this function
    removeProfessional({
      variables: { professionalId, organisationId: 3 }
    })
  }

  return (
    <>
      <HeroHeader />
      <UserButton afterSignOutUrl="/" />
      <Button onClick={handleAddProfessional}>Add Professional</Button>
      <Button onClick={() => handleRemoveProfessional(16)}>
        Remove Professional
      </Button>{' '}
      {/* Replace someProfessionalId with the actual ID */}
    </>
  )
}

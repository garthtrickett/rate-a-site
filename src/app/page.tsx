'use client'
import React from 'react'
import ServerComponent from './server-component'
import ClientComponent from './client-component'
import HeroHeader from '../components/pages/hero'
import FeatureCards from '../components/pages/feature-cards'
import { UserButton } from '@clerk/nextjs'
import { useStore } from '../store'
import { useEffect } from 'react'

const Page: React.FC = () => {
  const {
    actions: { setData }
  } = useStore(state => state)

  useEffect(() => {
    setData('data-from-store')
  }, [setData])

  return (
    <div>
      <ServerComponent />
      <ClientComponent />
      <FeatureCards />
      <HeroHeader />
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Page

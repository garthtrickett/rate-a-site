'use client'
import React from 'react'
import HeroHeader from '../components/pages/hero'
import FeatureCards from '../components/pages/feature-cards'
import { UserButton } from '@clerk/nextjs'

const Page: React.FC = () => {
  return (
    <div>
      <HeroHeader />
      <FeatureCards />
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Page

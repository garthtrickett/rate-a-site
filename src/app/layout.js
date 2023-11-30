import PropTypes from 'prop-types'
import { ApolloWrapper } from '../lib/apollo-wrapper'
import { AxiomWebVitals } from 'next-axiom'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '../lib/utils'
// These styles apply to every route in the application
import './globals.css'
import NavBar from '../components/layout/navBar'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

/**
 * @param {{ children: React.ReactNode }} props
 */
function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ApolloWrapper>
        <html lang="en">
          <AxiomWebVitals />
          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              fontSans.variable
            )}
          >
            <NavBar />
            {children}
          </body>
        </html>
      </ApolloWrapper>
    </ClerkProvider>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node
}

export default RootLayout

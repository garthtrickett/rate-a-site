import { ApolloWrapper } from '../lib/apollo-wrapper'
import { AxiomWebVitals } from 'next-axiom'
import React, { ReactNode, FC } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '../lib/utils'
import NavBar from '../components/layout/navBar'
import Footer from '../components/layout/footer'
// These styles apply to every route in the application
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
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
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout

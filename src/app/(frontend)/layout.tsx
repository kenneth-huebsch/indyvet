import React from 'react'
import { Urbanist } from 'next/font/google'
import '@/styles/globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
})

export const metadata = {
  description: 'IndyVet',
  title: 'IndyVet',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={urbanist.variable}>
      <body className={urbanist.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}

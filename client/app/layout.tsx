// app/layout.tsx
import type { Metadata } from 'next'
import { Header } from '../Components/layout/Header'
import { Footer } from '../Components/layout/Footer'
import FloatingButtons from '../Components/layout/FloatingButtons';
import './globals.css'

import Providers from './providers'

export const metadata: Metadata = {
  title: 'Kunnath House - Escape. Indulge. Reconnect.',
  description: 'Luxury farm stay booking platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingButtons />
        </Providers>
      </body>
    </html>
  )
}
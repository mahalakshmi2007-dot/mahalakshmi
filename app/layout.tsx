import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const title = 'Mahalakshmi S | AI & Full-Stack Developer'
const description =
  'Portfolio of Mahalakshmi S, an AI & Data Science student focused on full-stack development, AI/ML, and data-driven applications.'

export const metadata: Metadata = {
  title,
  description,
  generator: 'v0.app',
  authors: [{ name: 'Mahalakshmi S' }],
  keywords: [
    'Mahalakshmi S',
    'AI & Data Science',
    'Full-Stack Developer',
    'Machine Learning',
    'React',
    'FastAPI',
    'Python',
    'Portfolio',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Mahalakshmi S',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f9f9fc',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import './globals.css'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: 'CodeJAZZ',
  description: 'real-time code editor with private room sessions',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
        <Footer />
      </body>
    </html>
  )
}

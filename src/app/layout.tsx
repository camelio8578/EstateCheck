import type { Metadata } from "next"
import "./styles/globals.css"

// keeping metadata simple, no flashy descriptions
export const metadata: Metadata = {
  title: "EstateCheck — What happens to your stuff when you die",
  description: "Free estate snapshot. See what your family would face.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}

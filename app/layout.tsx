import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halle - Discover Quality Homes in Wolverhampton",
  description: "Trusted Real Estate Agents Serving West Midlands. Guidance across buying, selling, and lettings for both residential & commercial property.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

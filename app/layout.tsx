import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Script from "next/script"
import CustomCursor from "@/components/custom-cursor"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedBackground from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ajju Giri - Frontend Developer & SDE",
  description: "Interactive 3D portfolio showcasing frontend development skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <Navigation />
          <ScrollProgress />
          <AnimatedBackground />
          {children}
          <CustomCursor />
        </ThemeProvider>
        {/* Add a script to set a global flag when the DOM is fully loaded */}
        <Script id="dom-loaded-script" strategy="afterInteractive">
          {`
            window.domLoaded = true;
          `}
        </Script>
      </body>
    </html>
  )
}

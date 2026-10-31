import "./globals.css"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist } from "next/font/google"
import Link from "next/link"

import { Eyebrow, TriangleIcon } from "@/components/site/section"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-geist" })
const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
})

export const metadata: Metadata = {
  title: "TEOS IT — Page not found",
}

/** Bare 404 for URLs that never reach the localized layout. */
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={cn("antialiased", fontSans.variable, fontHeading.variable)}
    >
      <body className="flex min-h-screen items-center justify-center px-4 py-16">
        <main className="flex max-w-[560px] flex-col items-start gap-6">
          <TriangleIcon className="h-9 w-10 [&_path]:stroke-[1.2]" />
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.02] font-bold tracking-[-0.035em]">
            This page went missing.
          </h1>
          <p className="text-lg leading-[1.55] text-muted-foreground">
            The link may be old or mistyped, or the page has moved.
          </p>
          <Button
            nativeButton={false}
            size="pill-lg"
            render={<Link href="/" />}
          >
            Back to home
          </Button>
        </main>
      </body>
    </html>
  )
}

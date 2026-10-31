import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

// Blog posts live in content/blog as .mdx and are imported by the post page
const withMDX = createMDX()

const nextConfig: NextConfig = {
  images: {
    // 90 is used for app screenshots, where small UI text must stay sharp
    qualities: [75, 90],
  },
}

export default withNextIntl(withMDX(nextConfig))

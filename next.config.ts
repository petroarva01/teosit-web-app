import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

// Blog posts and legal pages live in content/ as .mdx and are imported by
// their pages. Plugins are named as strings so Turbopack can load them.
const withMDX = createMDX({
  options: { remarkPlugins: ["remark-gfm"] },
})

const nextConfig: NextConfig = {
  images: {
    // 90 is used for app screenshots, where small UI text must stay sharp
    qualities: [75, 90],
  },
  experimental: {
    // URLs outside /[locale] (e.g. /wp-login.php) never reach a layout
    globalNotFound: true,
  },
}

export default withNextIntl(withMDX(nextConfig))

import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    // 90 is used for app screenshots, where small UI text must stay sharp
    qualities: [75, 90],
  },
}

export default withNextIntl(nextConfig)

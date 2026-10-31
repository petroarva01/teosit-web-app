import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TEOS IT",
    short_name: "TEOS IT",
    description:
      "Software development studio in Novi Sad, Serbia: mobile apps, web platforms and AI features.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f5fa",
    theme_color: "#1b1936",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}

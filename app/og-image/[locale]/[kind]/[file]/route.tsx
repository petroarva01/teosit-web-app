import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"

import { getPost, posts } from "@/data/blog"
import { caseStudies, getCaseStudy } from "@/data/case-studies"
import { routing, type Locale } from "@/i18n/routing"
import { designedCaseStudies } from "@/lib/seo"

/**
 * Generated 1200×630 share images for blog posts and case studies that
 * don't have a designed one in public/og. URLs end in ".png" so the
 * locale proxy leaves them alone: /og-image/en/blog/mvp-cost.png
 */
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    ...posts.map((p) => ({ locale, kind: "blog", file: `${p.slug}.png` })),
    ...caseStudies
      .filter((c) => !designedCaseStudies.includes(c.slug))
      .map((c) => ({ locale, kind: "work", file: `${c.slug}.png` })),
  ])
}

const colors = {
  ink: "#1B1936",
  inkLight: "#2E2A5C",
  text: "#FFF0FB",
  muted: "#B9B5D3",
  accent: "#C9B6FF",
  label: "#8E8AB0",
}

// Folders are spelled out so the bundler only traces these files
const fontsDir = join(process.cwd(), "assets", "fonts")
const projectsDir = join(process.cwd(), "assets", "projects")

async function fonts() {
  // Each family ships as latin + latin-ext so č, ć, š, ž and đ render
  const files = [
    ["Bricolage", 700, "bricolage-grotesque-700"],
    ["Geist", 400, "geist-400"],
    ["Geist Mono", 400, "geist-mono-400"],
  ] as const
  return Promise.all(
    files.flatMap(([name, weight, file]) =>
      ["latin", "latin-ext"].map(async (subset) => ({
        name,
        weight,
        style: "normal" as const,
        data: await readFile(join(fontsDir, `${file}-${subset}.woff`)),
      }))
    )
  )
}

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

/** Nested outline triangles with the logomark in the middle, like the designed images. */
function TriangleMotif() {
  return (
    <svg width="440" height="390" viewBox="0 0 440 390">
      <path
        d="M220 6L434 384H6Z"
        fill="none"
        stroke="#5A5590"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M220 128L348 344H92Z"
        fill="none"
        stroke="#8A84C4"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {[
        "M220 196L246 240H194Z",
        "M190 248L216 292H164Z",
        "M250 248L276 292H224Z",
      ].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#B58CFF"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og-image/[locale]/[kind]/[file]">
) {
  const { locale: rawLocale, kind, file } = await params
  const locale = rawLocale as Locale
  const slug = file.replace(/\.png$/, "")

  let eyebrow: string
  let title: string
  let subtitle: string
  let visual: React.ReactNode

  if (kind === "blog") {
    const post = getPost(slug)
    if (!post) return new Response("Not found", { status: 404 })
    const t = await getTranslations({ locale, namespace: "Blog" })
    eyebrow = `Blog · ${t(`categories.${post.category}`)}`
    title = post.title[locale]
    subtitle = truncate(post.excerpt[locale], 120)
    visual = <TriangleMotif />
  } else {
    const study = getCaseStudy(slug)
    if (!study) return new Response("Not found", { status: 404 })
    eyebrow = study.eyebrow[locale]
    title = truncate(study.title[locale], 90)
    subtitle = study.facts.platform[locale]
    const image = await readFile(join(projectsDir, `${study.slug}.png`))
    visual = (
      // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser
      <img
        src={`data:image/png;base64,${image.toString("base64")}`}
        width={480}
        height={300}
        style={{ borderRadius: 24, border: "1px solid #3A3670" }}
        alt=""
      />
    )
  }

  const logo = await readFile(
    join(process.cwd(), "public", "images", "logo-dark.svg")
  )

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "64px 72px",
        backgroundImage: `linear-gradient(135deg, ${colors.ink} 40%, ${colors.inkLight})`,
        color: colors.text,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: kind === "blog" ? 640 : 560,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori */}
        <img
          src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
          width={152}
          height={34}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: title.length > 60 ? 50 : 60,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.4, color: colors.muted }}>
            {subtitle}
          </div>
        </div>
        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 20,
            color: colors.label,
          }}
        >
          teosit.com
        </div>
      </div>
      <div style={{ display: "flex" }}>{visual}</div>
    </div>,
    { width: 1200, height: 630, fonts: await fonts() }
  )
}

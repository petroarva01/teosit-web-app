import type * as React from "react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Project } from "@/data/projects"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

type Href = React.ComponentProps<typeof Link>["href"]

function projectHref(project: Project): Href {
  return project.hasCaseStudy
    ? { pathname: "/work/[slug]", params: { slug: project.slug } }
    : "/work"
}

/** Exposes a project's tint as CSS variables for the classes below. */
function projectColors({ colors }: Project) {
  return {
    "--project-bg": colors.bg,
    "--project-inner": colors.inner,
    "--project-label": colors.label,
    "--project-body": colors.body,
    "--project-text": colors.text,
  } as React.CSSProperties
}

/** Project composite, cropped to the card's screen area. */
function ProjectImage({
  project,
  locale,
  sizes,
  loading,
  position = project.image.position,
  className,
}: {
  project: Project
  locale: Locale
  sizes: string
  loading?: "eager" | "lazy"
  position?: Project["image"]["position"]
  className?: string
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-(--project-inner)", className)}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt[locale]}
        fill
        sizes={sizes}
        loading={loading}
        placeholder="blur"
        className={cn(
          "object-cover",
          position === "top" ? "object-top" : "object-center"
        )}
      />
    </div>
  )
}

/** Small floating card in the Home hero. */
function FloatingProjectCard({
  project,
  locale,
  featured = false,
  className,
}: {
  project: Project
  locale: Locale
  /** The top card in the hero gets a taller screen area */
  featured?: boolean
  className?: string
}) {
  return (
    <Link href={projectHref(project)} className={cn("block", className)}>
      <Card
        className="gap-3.5 rounded-3xl border-0 bg-(--project-bg) p-[18px] text-(--project-text) ring-0"
        style={projectColors(project)}
      >
        <ProjectImage
          project={project}
          locale={locale}
          sizes="280px"
          // Above the fold on desktop
          loading="eager"
          className={cn("rounded-[14px]", featured ? "h-[170px]" : "h-[150px]")}
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-heading text-xl font-semibold">
            {project.name}
          </span>
          <span className="font-mono text-xs text-(--project-label)">
            {project.heroMeta?.[locale]}
          </span>
        </div>
      </Card>
    </Link>
  )
}

/** Compact card for "Selected work" on Home. */
function ProjectCard({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  const home = project.home
  if (!home) return null

  return (
    <Link href={projectHref(project)} className="group block h-full">
      <Card
        className="h-full gap-6 rounded-[28px] border-0 bg-(--project-bg) p-8 text-(--project-text) ring-0 transition-[translate,box-shadow] duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_50px_-28px_rgba(27,25,54,0.4)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        style={projectColors(project)}
      >
        <ProjectImage
          project={project}
          locale={locale}
          sizes="(min-width: 1240px) 540px, (min-width: 1024px) 45vw, 100vw"
          className="h-[300px] rounded-[18px]"
        />
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[13px] text-(--project-label)">
            {home.label[locale]}
          </span>
          <h3 className="text-[30px] leading-tight font-semibold tracking-[-0.02em]">
            {home.title[locale]}
          </h3>
          <p className="text-base leading-[1.55] text-(--project-body)">
            {home.body[locale]}
          </p>
        </div>
      </Card>
    </Link>
  )
}

/** Large card on the Work page: image left, details right. */
function WorkProjectCard({
  project,
  locale,
  readCaseStudy,
}: {
  project: Project
  locale: Locale
  readCaseStudy: string
}) {
  const linkClass =
    "underline underline-offset-4 transition-opacity hover:opacity-70"

  return (
    <Card
      className="grid items-stretch gap-10 rounded-[32px] border-0 bg-(--project-bg) p-[clamp(24px,3vw,40px)] text-(--project-text) ring-0 lg:grid-cols-2"
      style={projectColors(project)}
    >
      <ProjectImage
        project={project}
        locale={locale}
        position="top"
        sizes="(min-width: 1240px) 560px, (min-width: 1024px) 45vw, 100vw"
        className="aspect-16/10 self-center rounded-[20px]"
      />
      <div className="flex flex-col justify-center gap-[18px]">
        <span className="font-mono text-[13px] text-(--project-label)">
          {project.meta[locale]}
        </span>
        <h2 className="text-[clamp(30px,3.2vw,44px)] leading-[1.05] font-bold tracking-[-0.03em]">
          {project.title[locale]}
        </h2>
        <p className="text-[17px] leading-[1.6] text-(--project-body)">
          {project.body[locale]}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags[locale].map((tag) => (
            <Badge
              key={tag}
              variant="tag"
              className="bg-(--project-inner) text-(--project-text)"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1.5 text-base font-semibold">
          {project.hasCaseStudy && (
            <Link href={projectHref(project)} className={linkClass}>
              {readCaseStudy} →
            </Link>
          )}
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}

export {
  projectColors,
  projectHref,
  FloatingProjectCard,
  ProjectCard,
  WorkProjectCard,
}

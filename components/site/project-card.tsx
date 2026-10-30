import type * as React from "react"

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

/** Placeholder for app screenshots until real images are added. */
function ScreenPlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-(--project-inner) px-4 text-center font-mono text-(--project-label)",
        className
      )}
    >
      [{label}]
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
        <ScreenPlaceholder
          label={`${project.name} screen`}
          className={cn(
            "rounded-[14px] text-xs",
            featured ? "h-[170px]" : "h-[150px]"
          )}
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
        <ScreenPlaceholder
          label={`${project.name} — ${project.categories.includes("web") ? "web" : "app"} screenshots`}
          className="h-[300px] rounded-[18px] text-[13px]"
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

export { FloatingProjectCard, ProjectCard }

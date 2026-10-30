import { cn } from "@/lib/utils"

/** Small outlined triangle from the logomark, used as a bullet / motif. */
function TriangleIcon({
  filled = false,
  className,
}: {
  filled?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 14 12"
      aria-hidden="true"
      className={cn("shrink-0 text-primary", className)}
    >
      <path
        d="M7 1L13 11H1Z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-mono text-[13px] tracking-[0.04em] text-primary uppercase",
        className
      )}
      {...props}
    />
  )
}

function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-[clamp(34px,4vw,52px)] leading-[1.05] font-bold tracking-[-0.03em]",
        className
      )}
      {...props}
    />
  )
}

/** Eyebrow + H2 on the left, optional "see all" link on the right. */
function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex max-w-[640px] flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
      </div>
      {action}
    </div>
  )
}

export { TriangleIcon, Eyebrow, SectionTitle, SectionHeading }

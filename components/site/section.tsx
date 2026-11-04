import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

/** Page-width wrapper: 1240px max, 32px gutters (16px on phones). */
const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-8"

/** "All services →" style text link. */
function ArrowLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-primary",
        className
      )}
      {...props}
    >
      {children} <span aria-hidden="true">→</span>
    </Link>
  )
}

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

/** Eyebrow + H1 + lead at the top of an inner page. */
function PageIntro({
  eyebrow,
  title,
  lead,
  titleClassName,
  className,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  titleClassName?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(
        container,
        "flex flex-col gap-6 pt-16 pb-12 sm:pt-24",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1
        className={cn(
          "text-[clamp(44px,6vw,80px)] leading-[1.02] font-bold tracking-[-0.035em]",
          titleClassName
        )}
      >
        {title}
      </h1>
      <p className="max-w-[40em] text-[19px] leading-[1.55] text-muted-foreground">
        {lead}
      </p>
      {children}
    </section>
  )
}

/** Purple call-to-action band that closes most pages. */
function CtaBand({
  title,
  body,
  button,
  aside,
  className,
}: {
  title: string
  body?: string
  button: string
  /** Extra content under the button, e.g. the email address */
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <section
      data-cta="cta_band"
      className={cn(container, "pt-[100px] pb-[120px]", className)}
    >
      <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-primary p-[clamp(40px,6vw,80px)] text-primary-foreground">
        <div className="flex max-w-[660px] flex-col gap-4">
          <h2 className="max-w-[12em] text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-bold tracking-[-0.035em]">
            {title}
          </h2>
          {body && (
            <p className="text-lg leading-[1.55] text-on-primary-muted">
              {body}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-3.5">
          <Button
            nativeButton={false}
            variant="inverse"
            size="pill-lg"
            render={<Link href="/contact" />}
          >
            {button}
          </Button>
          {aside}
        </div>
      </div>
    </section>
  )
}

export {
  container,
  ArrowLink,
  TriangleIcon,
  Eyebrow,
  SectionTitle,
  SectionHeading,
  PageIntro,
  CtaBand,
}

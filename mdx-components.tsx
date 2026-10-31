import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/utils"

/** Typography for blog posts, matching the site's body and heading styles. */
const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-8 text-[clamp(26px,2.6vw,32px)] leading-[1.15] font-bold tracking-[-0.025em]",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-4 text-[22px] leading-[1.25] font-semibold", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("text-foreground-soft", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "flex list-disc flex-col gap-2 pl-6 text-foreground-soft marker:text-primary",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "flex list-decimal flex-col gap-2 pl-6 text-foreground-soft marker:font-mono marker:text-primary",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => (
    <a
      href={href}
      // External links open in a new tab so readers keep their place
      {...(href?.startsWith("http") && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={cn(
        "font-medium text-primary underline underline-offset-4 transition-colors hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-2 border-primary pl-5 text-xl leading-[1.5] font-medium text-foreground",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.88em]",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-4 border-border", className)} {...props} />
  ),
  // Wide tables scroll sideways instead of stretching the page on phones
  table: ({ className, ...props }) => (
    <div className="-mx-4 overflow-x-auto px-4">
      <table
        className={cn("w-full min-w-[560px] text-left text-base", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b-2 border-foreground py-2.5 pr-4 font-mono text-xs font-normal tracking-[0.05em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-b border-border py-3 pr-4 align-top text-foreground-soft",
        className
      )}
      {...props}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}

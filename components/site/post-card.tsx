import type * as React from "react"

import type { Post } from "@/data/blog"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

/** Tinted placeholder cover with the logomark triangle, until posts get images. */
function PostCover({ post, className }: { post: Post; className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--cover-bg": post.cover.bg,
          "--cover-fg": post.cover.fg,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-[22px] bg-(--cover-bg)",
        className
      )}
    >
      <svg
        viewBox="0 0 14 12"
        className="w-[38%] text-(--cover-fg) opacity-60 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
      >
        <path
          d="M7 1L13 11H1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function postHref(post: Post) {
  return { pathname: "/blog/[slug]", params: { slug: post.slug } } as const
}

/** Large card for the newest post: cover on the left, text on the right. */
function FeaturedPostCard({
  post,
  title,
  excerpt,
  meta,
}: {
  post: Post
  title: string
  excerpt: string
  meta: string
}) {
  return (
    <Link
      href={postHref(post)}
      className="group grid items-center gap-10 rounded-[32px] border bg-card p-[clamp(20px,3vw,32px)] transition-[translate,box-shadow] duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(27,25,54,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:grid-cols-2"
    >
      <PostCover post={post} />
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[13px] text-primary">{meta}</span>
        <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.08] font-bold tracking-[-0.025em] transition-colors group-hover:text-primary">
          {title}
        </h2>
        <p className="text-[17px] leading-[1.6] text-muted-foreground">
          {excerpt}
        </p>
      </div>
    </Link>
  )
}

/** Compact card for the grid: cover, meta line and title. */
function PostCard({
  post,
  title,
  meta,
}: {
  post: Post
  title: string
  meta: string
}) {
  return (
    <Link href={postHref(post)} className="group flex flex-col gap-4">
      <PostCover post={post} />
      <span className="font-mono text-[13px] text-muted-foreground">
        {meta}
      </span>
      <h2 className="text-2xl leading-[1.2] font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary">
        {title}
      </h2>
    </Link>
  )
}

export { PostCover, FeaturedPostCard, PostCard, postHref }

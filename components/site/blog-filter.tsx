"use client"

import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { PostCategory } from "@/data/blog"
import { cn } from "@/lib/utils"

import { container } from "./section"

type Filter = "all" | PostCategory

/**
 * Topic chips next to the page intro, then the posts in that topic:
 * the first visible post is shown large, the rest in a grid.
 */
function BlogFilter({
  intro,
  label,
  labels,
  categories,
  items,
}: {
  intro: React.ReactNode
  label: string
  labels: Record<Filter, string>
  /** Topics that have at least one post, in display order */
  categories: PostCategory[]
  items: {
    key: string
    category: PostCategory
    featured: React.ReactNode
    card: React.ReactNode
  }[]
}) {
  const [filter, setFilter] = React.useState<Filter>("all")
  const visible = items.filter(
    (item) => filter === "all" || item.category === filter
  )
  const [first, ...rest] = visible

  return (
    <>
      <section
        className={cn(
          container,
          "flex flex-wrap items-end justify-between gap-8 pt-16 pb-14 sm:pt-24"
        )}
      >
        {intro}
        {/* A single topic has nothing to filter */}
        {categories.length > 1 && (
          <ToggleGroup
            value={[filter]}
            onValueChange={(value) => {
              // Keep one chip pressed: clicking the active chip is a no-op
              if (value[0]) setFilter(value[0] as Filter)
            }}
            aria-label={label}
            className="flex-wrap gap-2"
          >
            {(["all", ...categories] as Filter[]).map((f) => (
              <ToggleGroupItem
                key={f}
                value={f}
                className="h-auto min-h-11 rounded-full border border-input px-4 text-sm font-medium text-foreground hover:border-foreground hover:bg-transparent aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-on-dark"
              >
                {labels[f]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </section>
      {first && <div className={cn(container, "pb-14")}>{first.featured}</div>}
      {rest.length > 0 && (
        <div
          className={cn(
            container,
            "grid gap-x-7 gap-y-10 pb-10 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {rest.map((item) => (
            <React.Fragment key={item.key}>{item.card}</React.Fragment>
          ))}
        </div>
      )}
    </>
  )
}

export { BlogFilter }

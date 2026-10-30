"use client"

import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

import { container } from "./section"

type Category = Project["categories"][number]
type Filter = "all" | Category

const filters: Filter[] = ["all", "mobile", "web"]

/** Single-select chips that show only the projects in the chosen category. */
function WorkFilter({
  label,
  labels,
  items,
}: {
  label: string
  labels: Record<Filter, string>
  items: { key: string; categories: Category[]; card: React.ReactNode }[]
}) {
  const [filter, setFilter] = React.useState<Filter>("all")

  return (
    <>
      <div className={cn(container, "pt-10 pb-12")}>
        <ToggleGroup
          value={[filter]}
          onValueChange={(value) => {
            // Keep one chip pressed: clicking the active chip is a no-op
            if (value[0]) setFilter(value[0] as Filter)
          }}
          aria-label={label}
          className="flex-wrap gap-2.5"
        >
          {filters.map((f) => (
            <ToggleGroupItem
              key={f}
              value={f}
              className="h-auto min-h-11 rounded-full border border-input px-[18px] text-[15px] font-medium text-foreground hover:border-foreground hover:bg-transparent aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-on-dark"
            >
              {labels[f]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className={cn(container, "flex flex-col gap-7 pb-10")}>
        {items.map((item) => (
          <div
            key={item.key}
            hidden={filter !== "all" && !item.categories.includes(filter)}
          >
            {item.card}
          </div>
        ))}
      </div>
    </>
  )
}

export { WorkFilter }

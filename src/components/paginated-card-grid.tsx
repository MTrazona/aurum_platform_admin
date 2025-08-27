import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaginatedCardGridProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  pageSizeOptions?: number[]
  defaultPageSize?: number
  gridClassName?: string
}

export default function PaginatedCardGrid<T>({
  items,
  renderItem,
  pageSizeOptions = [6, 9, 12, 24],
  defaultPageSize = 9,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4",
}: PaginatedCardGridProps<T>) {
  const [pageSize, setPageSize] = React.useState<number>(defaultPageSize)
  const [page, setPage] = React.useState<number>(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const sliced = items.slice(startIndex, endIndex)

  React.useEffect(() => {
    // reset page when page size changes
    setPage(1)
  }, [pageSize])

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Page size</span>
          <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="w-[100px] bg-white cursor-pointer">
              <SelectValue placeholder={String(pageSize)} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Showing {items.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length}</span>
          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!canPrev}>
            Prev
          </Button>
          <span className="text-sm">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={!canNext}>
            Next
          </Button>
        </div>
      </div>

      <div className={gridClassName}>
        {sliced.map((item, idx) => renderItem(item, startIndex + idx))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!canPrev}>
            Prev
          </Button>
          <span className="text-sm">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={!canNext}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}


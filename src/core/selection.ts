import { Range } from "./types"

export function getSelectedRows(range?: Range | null): number[] {
  if (!range) return []

  const start = Math.min(range.start.row, range.end.row)
  const end = Math.max(range.start.row, range.end.row)

  const rows: number[] = []
  for (let r = start; r <= end; r++) {
    rows.push(r)
  }

  return rows
}

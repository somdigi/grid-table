import { Range } from "../core/types"

export function isCellInRange(
  row: number,
  col: number,
  range?: Range | null
) {
  if (!range || !range.start || !range.end) return []

  const r1 = Math.min(range.start.row, range.end.row)
  const r2 = Math.max(range.start.row, range.end.row)
  const c1 = Math.min(range.start.col, range.end.col)
  const c2 = Math.max(range.start.col, range.end.col)

  return row >= r1 && row <= r2 && col >= c1 && col <= c2
}

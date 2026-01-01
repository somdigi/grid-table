import { CellRange } from "./types"

export function normalizeRange(
  range: CellRange,
  rowCount: number = 999999,
  colCount: number = 999999
) {

  if (!range.start || !range.end) return null

  const top = Math.max(
    0,
    Math.min(range.start.row, range.end.row)
  )

  const bottom = Math.min(
    rowCount - 1,
    Math.max(range.start.row, range.end.row)
  )

  const left = Math.max(
    0,
    Math.min(range.start.col, range.end.col)
  )

  const right = Math.min(
    colCount - 1,
    Math.max(range.start.col, range.end.col)
  )

  return { top, bottom, left, right }
}


export function isCellInRange(
  row: number,
  col: number,
  range: CellRange
) {
  const r = normalizeRange(range)
  if (!r) return null
  return (
    row >= r.top &&
    row <= r.bottom &&
    col >= r.left &&
    col <= r.right
  )
}

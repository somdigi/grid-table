import { Column } from "./types"

export function buildGridTemplate(
  columns: Column[],
  scrollableX: boolean
) {
  const cols = columns.map(col => {
    if (col.width) return `${col.width}px`
    return scrollableX ? "150px" : "1fr"
  })

  // +1 untuk row header
  return `48px ${cols.join(" ")}`
}

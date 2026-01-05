import { Range } from "../core/types"

export function rangeToTSV(
  data: any[],
  columns: any[],
  range: Range,
  withHeader = false
) {
  const rows: string[] = []

  if (withHeader) {
    rows.push(
      columns
        .slice(range.start.col, range.end.col + 1)
        .map(c => c.headerName)
        .join("\t")
    )
  }

  for (let r = range.start.row; r <= range.end.row; r++) {
    rows.push(
      columns
        .slice(range.start.col, range.end.col + 1)
        .map(c => data[r][c.key] ?? "")
        .join("\t")
    )
  }

  return rows.join("\n")
}

import { normalizeRange } from "./range"

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

export async function pasteText() {
  return await navigator.clipboard.readText()
}

type CopyOptions = {
  withHeader?: boolean
}

export function rangeToTSV(
  rows: any[],
  columns: any[],
  range: any,
  options: CopyOptions = {}
) {
  const { withHeader = false } = options

  const { top, bottom, left, right } = normalizeRange(
    range,
    rows.length,
    columns.length
  )

  let result = ""

  /* ==== HEADER ==== */
  if (withHeader) {
    const header = columns
      .slice(left, right + 1)
      .map(c => c.header ?? c.field)
      .join("\t")

    result += header + "\n"
  }

  /* ==== DATA ==== */
  for (let r = top; r <= bottom; r++) {
    const line = columns
      .slice(left, right + 1)
      .map(c => rows[r]?.[c.field] ?? "")
      .join("\t")

    result += line + "\n"
  }

  return result.trimEnd()
}

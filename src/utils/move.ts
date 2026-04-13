import { CellPos } from "../core/types"

// core/move.ts
export function move(
  pos: CellPos,
  key: string,
  maxRow: number,
  maxCol: number
): CellPos {
  if (pos) {
    switch (key) {
      case "ArrowUp": return { row: Math.max(0, pos.row - 1), col: pos.col }
      case "ArrowDown": return { row: Math.min(maxRow, pos.row + 1), col: pos.col }
      case "ArrowLeft": return { row: pos.row, col: Math.max(0, pos.col - 1) }
      case "ArrowRight": return { row: pos.row, col: Math.min(maxCol, pos.col + 1) }
      default: return pos
    }
  }
  return null
}

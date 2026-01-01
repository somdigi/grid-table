import { CellPosition } from "./types"

export function moveCell(
  key: string,
  pos: CellPosition
): CellPosition | null {
  switch (key) {
    case "ArrowDown":
      return { row: pos.row + 1, col: pos.col }
    case "ArrowUp":
      return { row: Math.max(0, pos.row - 1), col: pos.col }
    case "ArrowRight":
      return { row: pos.row, col: pos.col + 1 }
    case "ArrowLeft":
      return { row: pos.row, col: Math.max(0, pos.col - 1) }
    default:
      return null
  }
}

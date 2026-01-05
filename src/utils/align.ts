import { ColumnAlign } from "../core/types"

export function getAlignClass(align?: ColumnAlign) {
  switch (align) {
    case "center":
      return "grid-align-center"
    case "right":
      return "grid-align-right"
    default:
      return "grid-align-left"
  }
}

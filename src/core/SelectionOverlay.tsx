import { useGrid } from "../core/GridContext"

type RectLTRB = {
  top: number
  left: number
  width: number
  height: number
}
export function convertToLTRB(
  start : { x : number, y : number },
  end : { x : number, y : number }
): RectLTRB {
  const top = Math.min(start.y, end.y)
  const left = Math.min(start.x, end.x)
  const right = Math.max(start.x, end.x)
  const bottom = Math.max(start.y, end.y)

  return {
    top,
    left,
    width : right - left,
    height : bottom - top,
  }
}

export function SelectionOverlay() {
  const { dragRect } = useGrid()

  if (!dragRect) return null

  return (
    <div
      className="rg-selection-overlay"
      style={convertToLTRB(dragRect.start || { x: 0, y : 0 }, dragRect.end || { x: 0, y : 0 })}
    />
  )
}

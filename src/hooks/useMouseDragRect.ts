import { useEffect, useRef } from "react"
import { CellPos } from "../core/types"

type OnMove = (start: CellPos, end: CellPos) => void
type OnEnd = () => void

export function useMouseDragRect(
  gridRef: React.RefObject<HTMLDivElement | null>,
  onMove: OnMove,
  onEnd: OnEnd
) {
  const startCell = useRef<CellPos | null>(null)
  const dragging = useRef(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    function getCellFromEvent(e: MouseEvent): CellPos | null {
      const cell = (e.target as HTMLElement).closest("[data-cell]")
      if (!cell) return null

      return {
        row: Number(cell.getAttribute("data-row")),
        col: Number(cell.getAttribute("data-col")),
      }
    }

    function onMouseDown(e: MouseEvent) {
      if (e.button !== 0) return

      const cell = getCellFromEvent(e)
      if (!cell) return

      dragging.current = true
      startCell.current = cell

      onMove(cell, cell)
    }

    function onMouseMove(e: MouseEvent) {
      if (!dragging.current || !startCell.current) return

      const cell = getCellFromEvent(e)
      if (!cell) return

      onMove(startCell.current, cell)
    }

    function onMouseUp() {
      if (!dragging.current) return

      dragging.current = false
      startCell.current = null
      onEnd()
    }

    function onMouseLeave() {
      if (!dragging.current) return

      dragging.current = false
      startCell.current = null
      onEnd()
    }

    grid.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    grid.addEventListener("mouseleave", onMouseLeave)

    return () => {
      grid.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      grid.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [gridRef, onMove, onEnd])
}

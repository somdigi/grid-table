import { createContext, useContext, useState } from "react"
import { CellPosition, CellRange } from "./types"

type GridState = {
  activeCell: CellPosition | null
  setActiveCell: (pos: CellPosition | null) => void

  range: CellRange | null
  setRange: (r: CellRange | null) => void

  anchor: CellPosition | null
  setAnchor: (p: CellPosition | null) => void
  
  previewRange: CellRange | null
  setPreviewRange: (p: CellRange | null) => void

  dragRect : DragRect | null
  setDragRect : (p: DragRect | null) => void

  isDragging : boolean
  setIsDragging : (p : boolean) => void
}

type PositionPoint = { x : number, y : number } 

export type DragRect = {
  x: number
  y: number
  width: number
  height: number
  start : { x : number, y : number }  | null,
  end : { x : number, y : number }  | null
} | null


const GridContext = createContext<GridState | null>(null)

export const useGrid = () => {
  const ctx = useContext(GridContext)
  if (!ctx) throw new Error("useGrid must be used inside GridProvider")
  return ctx
}

export function GridProvider({ children } : any) {
  const [activeCell, setActiveCell] = useState<CellPosition | null>(null)
  const [range, setRange] = useState<CellRange | null>(null)
  const [anchor, setAnchor] = useState<CellPosition | null>(null)
  const [previewRange, setPreviewRange] = useState<CellRange | null>(null)
  const [dragRect, setDragRect] = useState<DragRect | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  return (
    <GridContext.Provider
      value={{
        activeCell,
        setActiveCell,
        range,
        setRange,
        anchor,
        setAnchor,
        previewRange,
        setPreviewRange,
        dragRect,
        setDragRect,
        isDragging,
        setIsDragging
      }}
    >
      {children}
    </GridContext.Provider>
  )
}

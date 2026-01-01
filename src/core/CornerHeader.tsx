import { useGrid } from "./GridContext"

export function CornerHeader({ rowCount, colCount } : any) {
  const { setRange, setActiveCell, setAnchor } = useGrid()

  function onClick() {
    const start = { row: 0, col: 0 }
    const end = { row: rowCount - 1, col: colCount - 1 }

    setAnchor(start)
    setActiveCell(start)
    setRange({ start, end })
  }

  return (
    <div className="corner-header" onClick={onClick} />
  )
}

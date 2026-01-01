import { useGrid } from "./GridContext"

type Props = {
  col: number
  colCount: number
}

export function ColumnHeader({ col, colCount }: Props) {
  const { setRange, setActiveCell, setAnchor } = useGrid()

  function onClick(e: React.MouseEvent) {
    const start = { row: 0, col }
    const end = { row: Number.MAX_SAFE_INTEGER, col }

    setAnchor(start)
    setActiveCell(start)
    setRange({
      start,
      end: { row: 999999, col },
    })
  }

  return (
    <div className="col-header" onClick={onClick}>
      {String.fromCharCode(65 + col)}
    </div>
  )
}

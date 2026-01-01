import { useGrid } from "./GridContext"

type Props = {
  row: number
}

export function RowHeader({ row }: Props) {
  const { setRange, setActiveCell, setAnchor } = useGrid()

  function onClick() {
    const start = { row, col: 0 }
    const end = { row, col: 999999 }

    setAnchor(start)
    setActiveCell(start)
    setRange({ start, end })
  }

  return (
    <div className="row-header">
      {row + 1}
    </div>
  )
}

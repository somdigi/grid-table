import RowHeader from "./RowHeader"
import { Cell } from "./Cell"
import { useGrid } from "../core/GridContext"

export default function Row({
  rowIndex,
  row,
  columns,
  onChange,
}: any) {
  const {state, openContextMenu} = useGrid()

  return (
    <>
      <RowHeader row={rowIndex}  />

      {columns.map((col: any, colIndex: number) => (
        <Cell
          key={col.key}
          align={col.align}
          row={rowIndex}
          col={colIndex}
          value={row[col.key]}
          editable={col.editable}
          onContextMenu={(e : any) => {
            e.preventDefault()
            openContextMenu(e.clientX, e.clientY, {
              type: "row",
              rowIndex,
              range: state.range,
            })
          }}
          onChange={(val: any) =>
            onChange?.(rowIndex, col.key, val)
          }
        />
      ))}
    </>
  )
}

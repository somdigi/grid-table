import { Cell } from "./Cell"

export function Row({ rowIndex, columns, row, onCellChange } : any) {
  return (
    <div className="rg-row">
      {columns.map((col : any, colIndex : number) => (
        <Cell
          key={String(col.field)}
          row={rowIndex}
          col={colIndex}
          value={row[col.field]}
          editable={col.editable}
          onChange={(val : any) =>
            onCellChange(rowIndex, col.field, val)
          }
        />
      ))}
    </div>
  )
}

import { useGrid } from "../core/GridContext"
import { getAlignClass } from "../utils/align"
import { isCellInRange } from "../utils/range"

export function Cell({ row, col, value, editable, onChange, align = "left" }: any) {
  const { state, setState, openContextMenu } = useGrid()
  const active = state.editActive
  const selected = isCellInRange(row, col, state.range)
  const preview = isCellInRange(row, col, state.previewRange)

  return (
    <div
      data-cell
      data-row={row}
      data-col={col}
      className={`cell 
        ${getAlignClass(align)}
        ${(state.activeCell?.row === row && state.activeCell?.col === col) && "active" } 
        ${selected && "selected" }
        ${preview && "preview" }
      `}
      onContextMenu={(e) => {
        e.preventDefault()
        openContextMenu(e.clientX, e.clientY, {
          type: "cell",
          row,
          col,
          range: state.range,
        })
      }}
      contentEditable={active && editable}
      suppressContentEditableWarning
      onClick={() =>
        setState((s: any) => ({
          ...s,
          editActive : true,
          activeCell: { row, col },
          anchor: { row, col },
          range: null,
        }))
      }
      onBlur={(e) => onChange?.(e.currentTarget.textContent)}
    >
      {value}
    </div>
  )
}

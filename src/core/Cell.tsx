import { useGrid } from "../core/GridContext"
import { isCellInRange } from "../core/range"

export function Cell({ row, col, value, editable, onChange } : any) {
  const {
    activeCell,
    setActiveCell,
    range,
    anchor,
    setRange,
    setAnchor,
    setPreviewRange,
  } = useGrid()

  const isActive =
    activeCell?.row === row && activeCell?.col === col

  const inRange =
    range && isCellInRange(row, col, range)

  return (
    <div
      className={`rg-cell ${
        isActive ? "active" : ""
      } ${inRange ? "range" : ""}`}
      tabIndex={0}
      contentEditable={isActive && editable}
      suppressContentEditableWarning
      onMouseDown={(e: React.MouseEvent) => {
        setActiveCell({ row, col })
        setAnchor({ row, col })
        setRange({
          start: { row, col },
          end: { row, col },
        })
        setPreviewRange({ start: { row, col }, end: { row, col }, })

      }}
      onMouseEnter={(e) => {
        if (e.buttons === 1 && range) {
          setRange({
            start: range.start,
            end: { row, col },
          })
          setPreviewRange({ start: anchor, end: { row, col } })
        }
      }}
      onBlur={(e) =>
        onChange(e.currentTarget.textContent)
      }
    >
      {value}
    </div>
  )
}

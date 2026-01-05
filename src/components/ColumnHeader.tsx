import { useGrid } from "../core/GridContext"
import { ColumnAlign } from "../core/types"
import { getAlignClass } from "../utils/align"

export default function ColumnHeader({
  col,
  label,
  align = "left"
}: {
  col: number
  label: string
  align : ColumnAlign
}) {
  const { state, setState, openContextMenu } = useGrid()

  function onClick(e: React.MouseEvent) {
    e.preventDefault()

    setState((s: any) => {
      // SHIFT → extend selection
      if (e.shiftKey && s.anchor) {
        return {
          ...s,
          range: {
            start: { row: 0, col: s.anchor.col },
            end: { row: Number.MAX_SAFE_INTEGER, col },
          },
        }
      }

      return {
        ...s,
        anchor: { row: 0, col },
        activeCell: { row: 0, col },
        range: {
          start: { row: 0, col },
          end: { row: Number.MAX_SAFE_INTEGER, col },
        },
      }
    })
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        openContextMenu(e.clientX, e.clientY, {
          type: "column",
          col,
          range: state.range,
        })
      }}
      className={["column-header", getAlignClass(align)].join(" ")}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

import { useGrid } from "../core/GridContext"

export default function RowHeader({
  row,
}: {
  row: number
}) {
  const { state, setState } = useGrid()

  function onClick(e: React.MouseEvent) {
    e.preventDefault()

    setState((s: any) => {
      if (e.shiftKey && s.anchor) {
        return {
          ...s,
          range: {
            start: { row: s.anchor.row, col: 0 },
            end: { row, col: Number.MAX_SAFE_INTEGER },
          },
        }
      }

      return {
        ...s,
        anchor: { row, col: 0 },
        activeCell: { row, col: 0 },
        range: {
          start: { row, col: 0 },
          end: { row, col: Number.MAX_SAFE_INTEGER },
        },
      }
    })
  }

  return (
    <div className="row-header" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd"/></svg>
    </div>
  )
}

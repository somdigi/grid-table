// components/GridInner.tsx
import { useEffect, useMemo, useRef } from "react"
import { useGrid } from "../core/GridContext"
import { move } from "../utils/move"
import { rangeToTSV } from "../utils/clipboard"
import { SelectionOverlay } from "./SectionOverlay"
import { useClickOutside } from "../hooks/useClickOutside"
import { useMouseDragRect } from "../hooks/useMouseDragRect"
import { buildGridTemplate } from "../core/gridTemplate"
import ColumnHeader from "./ColumnHeader"
import Row from "./Row"
import { getSelectedRows } from "../core/selection"
import { ContextMenu } from "../core/ContextMenu"


export default function GridInner({
  columns,
  rows,
  scrollableX = true,
  copyWithHeader = false,
  onChange,
  onDeleteRows,
  propsContextMenu,
  classNames,
  coloring 
}: any) {

  
  const { state, setState, contextMenu, closeContextMenu, startEdit, updateDraft, cancelEdit } = useGrid()
  const gridRef = useRef<HTMLDivElement>(null)

  const maxRow = rows.length - 1
  const maxCol = columns.length - 1

  const gridTemplateColumns = useMemo(
    () => buildGridTemplate(columns, scrollableX),
    [columns, scrollableX]
  )

  useClickOutside(gridRef, () => {
    setState((s: any) => ({
      ...s,
      activeCell: null,
      anchor: null,
      range: null,
      previewRange: null,
    }))
    cancelEdit()
  })

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!state.activeCell) return

      if (e.key.length <= 1) {
        e.preventDefault()
        
        startEdit(state.activeCell.row, state.activeCell.col)
        updateDraft(e.key)
      }
      if (e.key.startsWith("Arrow")) {
        e.preventDefault()

        const next = move(
          state.activeCell,
          e.key,
          maxRow,
          maxCol
        )
        

        setState((s: any) => {
          if (e.shiftKey && s.anchor) {
            return {
              ...s,
              activeCell: next,
              previewRange: {
                start: s.anchor,
                end: next,
              },
            }
          }

          return {
            ...s,
            activeCell: next,
            anchor: next,
            range: null,
            previewRange: null,
          }
        })
      }


      if (e.key.startsWith("Enter")) {
        const next = move(
          state.activeCell,
          "ArrowDown",
          maxRow,
          maxCol
        )
        setState((s: any) => {
          return {
            ...s,
            editActive : true,
            activeCell: next,
            anchor: next,
            range: null,
            previewRange: null,
          }
        })
      }
      if (e.key.startsWith("Tab")) {
        e.preventDefault()
        const next = move(
          state.activeCell,
          "ArrowRight",
          maxRow,
          maxCol
        )
        setState((s: any) => {
          return {
            ...s,
            editActive : true,
            activeCell: next,
            anchor: next,
            range: null,
            previewRange: null,
          }
        })
        cancelEdit()
      }
      if (e.key.startsWith("Esc")) {
        const next = move(
          state.activeCell,
          "-",
          maxRow,
          maxCol
        )
        setState((s: any) => {
          return {
            ...s,
            editActive : true,
            activeCell: next,
            anchor: next,
            range: null,
            previewRange: null,
          }
        })
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault()
        setState((s: any) => ({
          ...s,
          range: {
            start: { row: 0, col: 0 },
            end: { row: maxRow, col: maxCol },
          },
          anchor: { row: 0, col: 0 },
        }))
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        if (!state.range && !state.activeCell) return

        const range = state.range ?? {
          start: state.activeCell!,
          end: state.activeCell!,
        }

        const tsv = rangeToTSV(
          rows,
          columns,
          range,
          e.shiftKey || copyWithHeader
        )

        navigator.clipboard.writeText(tsv)
      }

      // DELETE ROW
      if (e.key === "Delete" || e.key === "Backspace") {
        if (!state.range) return

        e.preventDefault()

        const rowsToDelete = getSelectedRows(state.range)
        if (!rowsToDelete.length) return

        onDeleteRows?.(rowsToDelete)

        // reset selection setelah delete
        setState((s: any) => ({
          ...s,
          activeCell: null,
          anchor: null,
          range: null,
          previewRange: null,
        }))
      }

    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [state, rows, columns])

  useMouseDragRect(gridRef, (start : any, end : any) => {
    setState((s: any) => ({
      ...s,
      previewRange: { start, end },
      anchor: s.anchor ?? start,
    }))
  }, () => {
    setState((s: any) => ({
      ...s,
      range: s.previewRange,
      previewRange: null,
    }))
  })

  return (
    <>
      {contextMenu && propsContextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          ctx={contextMenu.ctx}
          items={propsContextMenu}
          onClose={closeContextMenu}
        />
      )}
      <div className="grid-root" ref={gridRef}>
        <div
          className="grid"
          style={{ gridTemplateColumns }}
        >
          {/* Corner */}
          <div className="corner-header" />

          {/* Column Headers */}
          {columns.map((col : any, colIndex : number) => (
            <ColumnHeader
              key={col.key}
              col={colIndex}
              align={col.align}
              label={col.headerName}
              classNames={classNames}
            />
          ))}

          {/* Rows */}
          {rows.map((row : any, rowIndex : number) => (
            <Row
              key={rowIndex}
              rowIndex={rowIndex}
              row={row}
              columns={columns}
              onChange={onChange}
              classNames={classNames}
              coloring={coloring}
            />
          ))}
        </div>

        <SelectionOverlay />
      </div>
    </>
  )
}

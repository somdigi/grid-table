import { useEffect, useRef, useState } from "react"
import { useGrid } from "../core/GridContext"
import { getAlignClass } from "../utils/align"
import { isCellInRange } from "../utils/range"

export function Cell({ row, col, value, editable, onChange, align = "left", classNames, coloring }: any) {
  const { state, setState, openContextMenu, editingCell, startEdit, draftValue, updateDraft, commitEdit, cancelEdit } = useGrid()
  const activeCell = state.activeCell?.row === row && state.activeCell?.col === col
  const selected = isCellInRange(row, col, state.range)
  const preview = isCellInRange(row, col, state.previewRange)

  const active = editingCell?.row === row && editingCell?.col === col && editable

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (active) inputRef.current?.focus()
  }, [active])

  if (active) {
    return (
      <input
        ref={inputRef}
        value={draftValue}
        onChange={e => updateDraft(e.target.value)}
        onKeyDown={e => {
          if (e.key.length <= 1) {
            e.stopPropagation()
          }
          if (e.key === "Tab") {
            e.preventDefault()
            commitEdit(onChange)
          }
          if (e.key.startsWith("Arrow")) {
            e.stopPropagation()
          }
          if (e.key === "Enter") {
            e.preventDefault()
            commitEdit(onChange)
          }
          if (e.key === "Escape") {
            e.preventDefault()
            cancelEdit()
          }
        }}
        className="input-cell"
        style={{
          backgroundColor: "transparent",
          color: "black"
        }}
      />
    )
  }

  const checkColoringStyle = (row : number, col : number) => {
    const cell = coloring?.cells.find((cell : any) => cell.row == row && cell.col == col) 
    if (!cell) return {}
    
    return {
      backgroundColor: cell.color || "rgba(255, 62, 62, 0.47)",
      color: cell.textColor || "rgba(255, 255, 255, 1)",
    }
  }

  

  return (
    <div
      data-cell
      data-row={row}
      data-col={col}
      className={[
        "cell",
        getAlignClass(align),
        activeCell  ? "active" : "", 
        selected ? "selected" : "",
        preview ? "preview" : "",
        classNames?.data

      ].join(" ")}

      style={{...checkColoringStyle(row, col)}}
      onDoubleClick={() => editable && startEdit(row, col)}
      onContextMenu={(e) => {
        e.preventDefault()

         setState((s: any) => {
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
        
        openContextMenu(e.clientX, e.clientY, {
          type: "cell",
          row,
          col,
          range: state.range,
        })
      }}
      onClick={() => {
        if (state.activeCell?.row === row && state.activeCell?.col === col && editable){
          startEdit(row, col)
        }
        setState((s: any) => ({
          ...s,
          activeCell: { row, col },
          anchor: { row, col },
          range: null,
        }))
      }
      }
      onFocus={(e) => {
        const rect = e.target as HTMLDivElement
        const dataset = rect.dataset
        setState((s: any) => ({
          ...s,
          activeCell: { row: Number(dataset.row), col: Number(dataset.col) },
          anchor: { row: Number(dataset.row), col: Number(dataset.col) },
          range: null,
        }))
      }}

      onKeyDown={(e) => {
        if (e.key.startsWith("Arrow")) {
          e.stopPropagation()
        }
        if (e.key === "Enter") {
          e.preventDefault()
        }
        if (e.key === "Escape") {
          e.preventDefault()
        }
      }}
    >
      {typeof value === "boolean" ? <input type="checkbox" defaultChecked={value} onChange={(e) => onChange?.(e.target.checked)}/> : value}
    </div>
  )
}

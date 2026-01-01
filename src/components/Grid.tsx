import { GridProvider, useGrid } from "../core/GridContext"
import { moveCell } from "../core/navigation"
import { pasteText, copyText } from "../core/clipboard"
import { Row } from "../core/Row"
import { rangeToTSV } from "../core/clipboard"
import { normalizeRange } from "../core/range"
import { useEffect, useRef, useState } from "react"
import { SelectionOverlay } from "../core/SelectionOverlay"
import { useMouseDragRect } from "../core/hook"





function move(pos : any, key : any) {
  switch (key) {
    case "ArrowUp": return { row: Math.max(0, pos.row - 1), col: pos.col }
    case "ArrowDown": return { row: pos.row + 1, col: pos.col }
    case "ArrowLeft": return { row: pos.row, col: Math.max(0, pos.col - 1) }
    case "ArrowRight": return { row: pos.row, col: pos.col + 1 }
    default: return null
  }
}

export function Grid({ columns, rows, onChange } : any) {
  return (
    <GridProvider>
      <GridInner columns={columns} rows={rows} onChange={onChange} copyWithHeader={true} />
    </GridProvider>
  )
}

function GridInner({ columns, rows, onChange, copyWithHeader }: any) {
  const {
    activeCell,
    setActiveCell,
    anchor,
    setAnchor,
    range,
    setRange,
    previewRange,
    setPreviewRange,
    isDragging,
    setDragRect
  } = useGrid()

  const { onMouseDown, rect } = useMouseDragRect();
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!gridRef.current) return
      setDragRect(null)

      if (!gridRef.current.contains(e.target as Node)) {
        setActiveCell(null)
        setAnchor(null)
        setPreviewRange(null)
        setRange(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!gridRef.current) return 
    const clientgrid = gridRef.current.getBoundingClientRect()
    const newRect = {...rect}

    if (newRect.start && newRect.end) {
      newRect.start = {
        x: newRect.start.x - clientgrid.x,
        y: newRect.start.y - clientgrid.y
      }
  
      newRect.end = {
        x: newRect.end.x - clientgrid.x,
        y: newRect.end.y - clientgrid.y
      }
    }
    setDragRect(newRect as any)
  }, [rect])

  useEffect(() => {
    if (!isDragging) {
      setDragRect(null)
    }
  }, [isDragging])

  const rowCount = rows.length
  const colCount = columns.length

  async function handleKeyDown(e: React.KeyboardEvent) {
    /* CTRL + A */
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
      e.preventDefault()
      const start = { row: 0, col: 0 }
      const end = { row: rowCount - 1, col: colCount - 1 }
      setAnchor(start)
      setActiveCell(start)
      setRange({ start, end })
      return
    }

    if (!activeCell) return

    /* SHIFT + ARROW */
    if (e.shiftKey && e.key.startsWith("Arrow")) {
      e.preventDefault()
      const next = move(activeCell, e.key)
      if (!next) return
      const base = anchor ?? activeCell
      setAnchor(base)
      setActiveCell(next)
      setRange({ start: base, end: next })
      return
    }

    /* ARROW */
    if (!e.shiftKey && e.key.startsWith("Arrow")) {
      e.preventDefault()
      const next = move(activeCell, e.key)
      if (!next) return
      setAnchor(next)
      setActiveCell(next)
      setRange({ start: next, end: next })
      return
    }

    /* COPY */
    if (e.ctrlKey && e.key === "c" && range) {
      const text = rangeToTSV(
        rows,
        columns,
        range,
        { withHeader: copyWithHeader || e.shiftKey }
      )

      await copyText(text)
    }

    /* PASTE */
    if (e.ctrlKey && e.key === "v" && activeCell) {
      e.preventDefault()
      const text = await pasteText()
      const lines = text.split("\n").map(l => l.split("\t"))
      const next = [...rows]

      lines.forEach((line, rIdx) => {
        line.forEach((val, cIdx) => {
          const r = activeCell.row + rIdx
          const c = activeCell.col + cIdx
          if (!next[r] || !columns[c]) return
          next[r] = {
            ...next[r],
            [columns[c].field]: val,
          }
        })
      })

      onChange(next)
    }
  }


  return (
    <div 
      ref={gridRef}
      className="rg-grid" 
      tabIndex={0} 
      style={{ position: "relative" }}
      onKeyDown={handleKeyDown}
      onMouseDown={onMouseDown}
      onMouseUp={() => {
        if (!previewRange) return
        setRange(previewRange)
        setPreviewRange(null)
        setDragRect(null)
      }}
    >
      <SelectionOverlay />
      {/* ===== HEADER ===== */}
      <div className="rg-row rg-header">
        {/* CORNER */}
        <div
          className="rg-corner"
          onClick={() => {
            const start = { row: 0, col: 0 }
            const end = { row: rowCount - 1, col: colCount - 1 }
            setAnchor(start)
            setActiveCell(start)
            setRange({ start, end })
          }}
        />

        {/* COLUMN HEADER */}
        {columns.map((col: any, c: number) => (
          <div
            key={c}
            className="rg-col-header"
            onClick={() => {
              const start = { row: 0, col: c }
              const end = { row: rowCount - 1, col: c }
              setAnchor(start)
              setActiveCell(start)
              setRange({ start, end })
            }}
          >
            {col.headerName}
          </div>
        ))}
      </div>

      {/* ===== BODY ===== */}
      {rows.map((row: any, r: number) => (
        <div key={r} className="rg-row">
          {/* ROW HEADER */}
          <div
            className="rg-row-header"
            onClick={() => {
              const start = { row: r, col: 0 }
              const end = { row: r, col: colCount - 1 }
              setAnchor(start)
              setActiveCell(start)
              setRange({ start, end })
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 48 48">
              <path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="m20 12l12 12l-12 12z" />
            </svg>
          </div>

          <Row
            rowIndex={r}
            row={row}
            columns={columns}
            onCellChange={(ri: any, field: any, val: any) => {
              const next = [...rows]
              next[ri] = { ...next[ri], [field]: val }
              onChange(next)
            }}
          />
        </div>
      ))}
    </div>
  )
}

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { GridState, CellPos, Range, GridContextInfo } from "./types"

type ContextMenuState = {
  x: number
  y: number
  ctx: any
} | null
const GridContext = createContext<any>(null)

export const GridProvider = ({ children }: any) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [state, setState] = useState<GridState>({
    activeCell: null,
    anchor: null,
    range: null,
    previewRange: null,
  })

  function openContextMenu(
    x: number,
    y: number,
    ctx: any
  ) {
    setContextMenu({ x, y, ctx })
  }

  function closeContextMenu() {
    setContextMenu(null)
  }

  return (
    <GridContext.Provider value={{ 
        contextMenu,
        openContextMenu,
        closeContextMenu,
        state, 
        setState 
      }}>
      {children}
    </GridContext.Provider>
  )
}

type ContextMenuProps = {
  x: number
  y: number
  items: {
    label: string
    shortcut?: string
    disabled?: boolean
    onClick: (ctx: any) => void
  }[]
  ctx: any
  onClose: () => void
}

export function ContextMenu({
  x,
  y,
  items,
  ctx,
  onClose,
}: ContextMenuProps) {
  const contextRef = useRef<any>(null)
  useEffect(() => {
    if (!ctx) return

    function handleClick(e: MouseEvent) {
      if (!contextRef.current) return

      // klik DI LUAR grid → tutup context menu
      if (!contextRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    window.addEventListener("mousedown", handleClick)
    return () =>
      window.removeEventListener("mousedown", handleClick)
  }, [ctx])
  return (
    <div
      ref={contextRef}
      className="grid-context-menu"
      style={{
        position: "fixed",
        top: y,
        left: x,
        zIndex: 9999,
      }}
      // onMouseLeave={onClose}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`menu-item ${
            item.disabled ? "disabled" : ""
          }`}
          onClick={() => {
            if (item.disabled) return
            item.onClick(ctx)
            onClose()
          }}
        >
          <span>{item.label}</span>
          {item.shortcut && (
            <span className="shortcut">
              {item.shortcut}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}


export const useGrid = () => useContext(GridContext)

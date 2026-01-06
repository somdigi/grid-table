import { useEffect, useRef } from "react"
import { ContextMenuProps } from "./types"

export function ContextMenu({ x, y, items, ctx, onClose }: ContextMenuProps) {
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

import { useGrid } from "../core/GridContext"

export function SelectionOverlay() {
  const { state } = useGrid()
  if (!state.range) return null
  return <div className="selection-overlay" />
}

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { GridState, CellPos, Range, GridContextInfo, ContextMenuProps, ContextMenuState } from "./types"

const initialState = {
  activeCell: null,
  anchor: null,
  range: null,
  previewRange: null,
}

const GridContext = createContext<any>(null)
export const GridProvider = ({ children }: any) => {
  const [data, setData] = useState<string[][]>([])
  const [editingCell, setEditingCell] = useState<CellPos>(null)

  const [draftValue, setDraftValue] = useState("")
  const [oldValue, setOldValue] = useState("")
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [state, setState] = useState<GridState>(initialState)

  function openContextMenu( x: number, y: number, ctx: any ) {
    setContextMenu({ x, y, ctx })
  }

  function closeContextMenu() {
    setContextMenu(null)
  }


  const startEdit = (row: number, col: number) => {
    const value = data[row]?.[col] ?? ""
    setEditingCell({ row, col })
    setOldValue(value)
    setDraftValue(value)
  }

  const updateDraft = (value: string) => {
    setDraftValue(value)
  }

  const commitEdit = (onChange : (v : any) => void | null) => {
    if (!editingCell) return

    const { row, col } = editingCell
    onChange?.(draftValue)
    setEditingCell(null)
  }

  const cancelEdit = () => {
    setDraftValue(oldValue)
    setEditingCell(null)
  }

  return (
    <GridContext.Provider value={{ 
        contextMenu,
        openContextMenu,
        closeContextMenu,
        state, 
        setState,
        data,
        setData,
        editingCell,
        startEdit,
        updateDraft,
        commitEdit,
        cancelEdit,
        draftValue,
      }}>
      {children}
    </GridContext.Provider>
  )
}


export const useGrid = () => useContext(GridContext)

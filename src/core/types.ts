// core/types.ts
export type CellPos = { row: number; col: number } | null

export type Range = {
  start: CellPos
  end: CellPos
}

export type ColumnAlign = "left" | "center" | "right"

export type Column = {
  key: string
  headerName: string
  width?: number
  editable?: boolean
  align?: ColumnAlign
}

export type GridState = {
  activeCell: CellPos | null
  anchor: CellPos | null
  range: Range | null
  previewRange: Range | null
  contextMenu?: GridContextMenuItem[]
}

export type GridInnerProps = {
  columns: Column[]
  rows: any[]
  scrollableX?: boolean
  copyWithHeader?: boolean
  onChange?: (row: number, key: string, value: any) => void
}



export type GridContextType =
  | "cell"
  | "row"
  | "column"
  | "corner"

export interface GridContextInfo {
  type: GridContextType
  rowIndex?: number
  colIndex?: number
  range?: Range | null
}

export interface GridContextMenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  onClick: (ctx: GridContextInfo) => void
}


export type ContextMenuProps = {
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

export type ContextMenuState = {
  x: number
  y: number
  ctx: any
} | null

export type ColumnDef<T = any> = {
  field: keyof T
  headerName: string
  width?: number
  editable?: boolean
}

export type CellPosition = {
  row: number
  col: number
}

export type CellRange = {
  start: CellPosition | null
  end: CellPosition | null
}
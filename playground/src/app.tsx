import { useState } from "react"
import { Grid, ColumnDef } from "somdigi-grid-table/dist/index.mjs"
import "somdigi-grid-table/dist/index.css"

type Row = {
  name: string
  price: number
}

export function App() {
  const [rows, setRows] = useState<Row[]>([
    { name: "Apple", price: 1000 },
    { name: "Banana", price: 2000 },
    { name: "Orange", price: 3000 },
  ])

  const columns: ColumnDef<Row>[] = [
    { field: "name", headerName: "Name", editable: false },
    { field: "price", headerName: "Price", editable: false },
    { field: "price", headerName: "Price", editable: false },
    { field: "price", headerName: "Price", editable: false },
    { field: "price", headerName: "Price", editable: false },
    { field: "price", headerName: "Price", editable: false },
    { field: "price", headerName: "Price", editable: false },
  ]

  return (
    <div style={{ padding: 20 }}>
      <h2>React Grid Lite – Test</h2>

      <Grid
        columns={columns}
        rows={rows}
        onChange={setRows}
        copyWithHeader={true}
      />

      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  )
}

import { useState } from "react"
import { Grid } from "../../dist"
import "../../dist/index.css"

const columns = [
  { key: "name", headerName: "Name", editable: true},
  { key: "qty", headerName: "Qty", editable: true, align: "center", width: 100 },
  { key: "price", headerName: "Price", editable: true, align: "right", width: 200 },
]

export default function App() {
  const [rows, setRows] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      name: `Item ${i + 1}`,
      qty: i + 1,
      price: (i + 1) * 1000,
    }))
  )

  return (
    <div style={{ padding: 24, display: "flex", flexFlow: "column", width: "1288px", fontSize: "13px" }}>
      <h2>🧪 Grid Sheet – Example</h2>

      <Grid
        columns={columns}
        rows={rows}
        copyWithHeader
        scrollableX={false}
        propsContextMenu={[
        {
          label: "Delete Row",
          shortcut: "Del",
          onClick: (ctx : any) => {
            console.log(ctx);
            
            // if (!range) return
            // onDeleteRows(getSelectedRows(range))
          },
        },
        {
          label: "Insert Row Below",
          onClick: (rowIndex : any) => {
            console.log(rowIndex);
            
            // insertRow(rowIndex! + 1)
          },
        },
        {
          label: "Duplicate Row",
          onClick: ({ rowIndex } : any) => {
            // duplicateRow(rowIndex!)
          },
        },
      ]}
        onDeleteRows={(range : any) => console.log(range)}
        onChange={(row : any, key : any, value : any) => {
          setRows(r => {
            const next = [...r]
            next[row] = { ...next[row], [key]: value }
            return next
          })
        }}
      />
    </div>
  )
}

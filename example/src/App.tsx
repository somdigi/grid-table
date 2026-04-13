import { useState } from "react"
import { Grid } from "../../dist"
import "../../dist/index.css"

const columns = [
  { key: "test", headerName: "Test", editable: false},
  { key: "name", headerName: "Name", editable: false},
  { key: "qty", headerName: "Qty", editable: true, align: "center", width: 100 },
  { key: "price", headerName: "Price", editable: true, align: "right", width: 200 },
]

export default function App() {
  const [rows, setRows] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      test: Boolean("false"),
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
            // if (!range) return
            // onDeleteRows(getSelectedRows(range))
          },
        },
        {
          label: "Insert Row Below",
          onClick: (ctx : any) => {
            
            // insertRow(rowIndex! + 1)
          },
        },
        {
          label: "Duplicate Row",
          onClick: (ctx : any) => {
            // duplicateRow(rowIndex!)
          },
        },
      ]}
        onDeleteRows={(range : any) => console.log(range)}
        onChange={(row : any, key : any, value : any) => {
          console.log(value);
          
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

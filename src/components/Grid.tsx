import { GridProvider } from "../core/GridContext"
import GridInner from "./GridInner"

export function Grid(props: any) {
  return (
    <GridProvider>
      <GridInner {...props} />
    </GridProvider>
  )
}

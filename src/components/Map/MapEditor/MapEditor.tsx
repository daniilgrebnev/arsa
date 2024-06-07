import { useSelector } from "react-redux"
import { LineEditor } from "./LineEditor/LineEditor"
import { RootState } from "@/store/store"
import { RectangleEditor } from "./RetangleEditor/RectangleEditor"
import { CircleEditor } from "./CircleEditor/CircleEditor"
import L from "leaflet"
import { useRef } from "react"
import { PolygonEditor } from "./PolygonEditor/PolygonEditor"

export const MapEditor = () => {
  const typeFigure = useSelector((state: RootState) => state.map.creatorFigure.geometry_type_id)

  const customIcon = useRef(
    L.divIcon({
      iconSize: [30, 30],
    }),
  )

  return (
    <div>
      {typeFigure === "line" && <LineEditor />}
      {typeFigure === "rectangle" && <RectangleEditor />}
      {typeFigure === "circle" && <CircleEditor />}
      {typeFigure === "polygon" && <PolygonEditor />}
    </div>
  )
}

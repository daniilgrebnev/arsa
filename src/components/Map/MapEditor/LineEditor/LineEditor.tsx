import { latLng } from "leaflet"
import { useMemo, useRef, useState } from "react"
import { useMapEvent, Polyline, Marker } from "react-leaflet"
import L from "leaflet"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import { addGeozonePoint, setGeozonePoint } from "./../../../../store/reducers/map/map"

export const LineEditor = () => {
  const dispatch = useDispatch()
  const [transparent, setTransparent] = useState<any>(null)

  const colorFigure = useSelector((state: RootState) => state.map.creatorFigure.color)
  const opacityFigure = useSelector((state: RootState) => state.map.creatorFigure.transparency)
  const lineWidth = useSelector((state: RootState) => state.map.creatorFigure.line_width)
  const points = useSelector((state: RootState) => state.map.creatorFigure.geozone_points)

  const customIcon = useRef(
    L.divIcon({
      iconSize: [20, 20],
    }),
  )

  useMapEvent("click", (e) => {
    dispatch(addGeozonePoint(e.latlng))
  })

  useMapEvent("mousemove", (e) => {
    setTransparent(e.latlng)
  })

  const moveMarker = (e, index) => {
    const newPoints: any = [...points]
    newPoints[index] = e.latlng
    dispatch(setGeozonePoint(newPoints))
  }

  return (
    <>
      {points.length > 0 && (
        <Polyline
          positions={points}
          pathOptions={{
            color: colorFigure,
            weight: lineWidth,
            opacity: opacityFigure,
          }}
        >
          {points.map((point, index) => {
            return (
              <Marker
                position={point}
                icon={customIcon.current}
                draggable={true}
                eventHandlers={{ move: (e) => moveMarker(e, index) }}
                key={index}
              />
            )
          })}
          {transparent && (
            <Polyline
              positions={[points[points.length - 1], transparent]}
              dashArray="5, 10"
              pathOptions={{
                color: colorFigure,
                weight: lineWidth,
                opacity: opacityFigure,
              }}
            />
          )}
        </Polyline>
      )}
    </>
  )
}

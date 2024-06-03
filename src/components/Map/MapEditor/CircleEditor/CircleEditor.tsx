import { RootState } from "@/store/store"
import L from "leaflet"
import { useRef, useState } from "react"
import { Circle, Marker, useMapEvent } from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import { findNewPoints } from "../../../../helpers/map"
import {
  addGeozonePoint,
  setGeozonePoint,
  setLatLng,
  setRadius,
} from "./../../../../store/reducers/map/map"

export const CircleEditor = () => {
  const dispatch = useDispatch()
  const [transparentCircle, setTransparentCircle] = useState<any>(null)

  const { latitube, longitube } = useSelector((state: RootState) => state.map.creatorFigure)
  const colorFigure = useSelector((state: RootState) => state.map.creatorFigure.color)
  const opacityFigure = useSelector((state: RootState) => state.map.creatorFigure.transparency)
  const lineWidth = useSelector((state: RootState) => state.map.creatorFigure.line_width)
  const points = useSelector((state: RootState) => state.map.creatorFigure.geozone_points)
  const radius = useSelector((state: RootState) => state.map.creatorFigure.radius)

  const customIcon = useRef(
    L.divIcon({
      iconSize: [20, 20],
    })
  )

  useMapEvent("click", (e) => {
    if (radius) {
      return
    }
    if (!latitube && !longitube) {
      dispatch(setLatLng(e.latlng))
      return
    }
    if (latitube && longitube) {
      dispatch(setRadius(L.latLng(latitube, longitube).distanceTo(e.latlng)))
    }
    dispatch(addGeozonePoint(e.latlng))
  })

  useMapEvent("mousemove", (e) => {
    if (radius) {
      setTransparentCircle(null)
      return
    }
    if (latitube && longitube) {
      setTransparentCircle(L.latLng(latitube, longitube).distanceTo(e.latlng))
    }
  })

  const handleCenter = (e: any) => {
    dispatch(setLatLng(e.target.getLatLng()))
    if (latitube && longitube) {
      dispatch(
        setGeozonePoint(
          findNewPoints(points, e.target.getLatLng(), {
            lat: latitube,
            lng: longitube,
          })
        )
      )
    }
  }

  const handleRadius = (e: any) => {
    dispatch(setGeozonePoint([e.target.getLatLng()]))
    if (latitube && longitube) {
      dispatch(setRadius(e.target.getLatLng().distanceTo(L.latLng(latitube, longitube))))
    }
  }

  return (
    <>
      {radius && latitube && longitube && (
        <Circle
          center={L.latLng(latitube, longitube)}
          radius={radius}
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure,
            weight: lineWidth,
          }}
        >
          <Marker
            position={points[0]}
            draggable={true}
            eventHandlers={{
              move: (e) => handleRadius(e),
            }}
            icon={customIcon.current}
          />
        </Circle>
      )}
      {latitube && longitube && (
        <Marker
          position={L.latLng(latitube, longitube)}
          draggable={true}
          eventHandlers={{
            move: (e) => handleCenter(e),
          }}
          icon={customIcon.current}
        />
      )}
      {transparentCircle && latitube && longitube && (
        <Circle
          center={L.latLng(latitube, longitube)}
          radius={transparentCircle}
          dashArray="5, 10"
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure,
            weight: lineWidth,
          }}
        />
      )}
    </>
  )
}

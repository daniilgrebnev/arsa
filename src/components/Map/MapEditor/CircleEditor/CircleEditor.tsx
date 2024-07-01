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

  const { latitude, longitude } = useSelector((state: RootState) => state.map.creatorFigure)
  const colorFigure = useSelector((state: RootState) => state.map.creatorFigure.color)
  const opacityFigure = useSelector((state: RootState) => state.map.creatorFigure.transparency)
  const lineWidth = useSelector((state: RootState) => state.map.creatorFigure.line_width)
  const points = useSelector((state: RootState) => state.map.creatorFigure.geozone_points)
  const radius = useSelector((state: RootState) => state.map.creatorFigure.radius)

  const customIcon = useRef(
    L.divIcon({
      iconSize: [20, 20],
    }),
  )

  useMapEvent("click", (e) => {
    if (radius) {
      return
    }
    if (!latitude && !longitude) {
      dispatch(setLatLng(e.latlng))
      return
    }
    if (latitude && longitude) {
      dispatch(setRadius(L.latLng(latitude, longitude).distanceTo(e.latlng)))
    }
    dispatch(addGeozonePoint(e.latlng))
  })

  useMapEvent("mousemove", (e) => {
    if (radius) {
      setTransparentCircle(null)
      return
    }
    if (latitude && longitude) {
      setTransparentCircle(L.latLng(latitude, longitude).distanceTo(e.latlng))
    }
  })

  const handleCenter = (e: any) => {
    dispatch(setLatLng(e.target.getLatLng()))
    if (latitude && longitude) {
      dispatch(
        setGeozonePoint(
          findNewPoints(points, e.target.getLatLng(), {
            lat: latitude,
            lng: longitude,
          }),
        ),
      )
    }
  }

  const handleRadius = (e: any) => {
    dispatch(setGeozonePoint([e.target.getLatLng()]))
    if (latitude && longitude) {
      dispatch(setRadius(e.target.getLatLng().distanceTo(L.latLng(latitude, longitude))))
    }
  }

  return (
    <>
      {radius && latitude && longitude && (
        <Circle
          center={L.latLng(latitude, longitude)}
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
      {latitude && longitude && (
        <Marker
          position={L.latLng(latitude, longitude)}
          draggable={true}
          eventHandlers={{
            move: (e) => handleCenter(e),
          }}
          icon={customIcon.current}
        />
      )}
      {transparentCircle && latitude && longitude && (
        <Circle
          center={L.latLng(latitude, longitude)}
          radius={transparentCircle}
          dashArray="5, 10"
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure / 100,
            weight: lineWidth,
          }}
        />
      )}
    </>
  )
}

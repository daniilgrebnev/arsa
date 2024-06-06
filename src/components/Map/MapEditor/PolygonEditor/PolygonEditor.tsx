import { RootState } from "@/store/store"
import React, { useEffect, useRef, useState } from "react"
import { Marker, Polygon, Polyline, useMapEvent } from "react-leaflet"
import { useSelector } from "react-redux"
import L, { LatLng, latLng } from "leaflet"
import { useDispatch } from "react-redux"
import {
  addGeozonePoint,
  addGeozonePointIndex,
  setGeozonePoint,
  setLatLng,
  setRadius,
} from "./../../../../store/reducers/map/map"
import { findNewPoints, findPolygonCenter, maxDistance } from "./../../../../helpers/map"

export const PolygonEditor = () => {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(true)
  const [transparent, setTransparent] = useState<any>(null)

  const [newPoint, setNewPoints] = useState<any>([])

  const colorFigure = useSelector((state: RootState) => state.map.creatorFigure.color)
  const opacityFigure = useSelector((state: RootState) => state.map.creatorFigure.transparency)
  const lineWidth = useSelector((state: RootState) => state.map.creatorFigure.line_width)
  const points = useSelector((state: RootState) => state.map.creatorFigure.geozone_points)

  const { latitube, longitube } = useSelector((state: RootState) => state.map.creatorFigure)

  const customIcon = useRef(
    L.divIcon({
      iconSize: [20, 20],
    }),
  )
  const newCustomIcon = useRef(
    L.divIcon({
      className: "newCustomIcon",
      iconSize: [20, 20],
    }),
  )

  useMapEvent("click", (e) => {
    if (edit) {
      dispatch(addGeozonePoint(e.latlng))
    }
  })

  useMapEvent("mousemove", (e) => {
    setTransparent(e.latlng)
  })

  useEffect(() => {
    if (points.length >= 3) {
      const result = findPolygonCenter(points)
      dispatch(setLatLng(result))
    }
  }, [points])

  useEffect(() => {
    console.log(points)
    if (!edit) {
      setNewPoints([])
      points.forEach((el, index) => {
        if (index === points.length - 1) {
          setNewPoints((prev: any) => [
            ...prev,
            latLng({
              lat: (el.lat + points[0].lat) / 2,
              lng: (el.lng + points[0].lng) / 2,
            }),
          ])
          return
        }
        setNewPoints((prev: any) => [
          ...prev,
          latLng({
            lat: (el.lat + points[index + 1].lat) / 2,
            lng: (el.lng + points[index + 1].lng) / 2,
          }),
        ])
      })
    }
  }, [edit, points])

  const clickLastPoint = () => {
    setEdit(false)
    dispatch(setRadius(maxDistance(points, { lat: latitube, lng: longitube })))
  }

  const moveMarker = (e, index) => {
    const newPoints: any = [...points]
    newPoints[index] = e.latlng
    dispatch(setGeozonePoint(newPoints))
    dispatch(setRadius(maxDistance(points, { lat: latitube, lng: longitube })))
  }

  const handleCenter = (e) => {
    dispatch(
      setGeozonePoint(
        findNewPoints(points, e.target.getLatLng(), {
          lat: latitube,
          lng: longitube,
        }),
      ),
    )
  }

  return (
    <>
      {!edit && (
        <Polygon
          positions={points}
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure,
            weight: lineWidth,
          }}
        >
          {points.map((position, index) => {
            return (
              <Marker
                position={position}
                key={index}
                draggable={true}
                eventHandlers={{
                  move: (e) => moveMarker(e, index),
                }}
                icon={customIcon.current}
              />
            )
          })}
          {latitube && longitube && (
            <Marker
              position={{ lat: latitube, lng: longitube }}
              draggable={true}
              eventHandlers={{
                move: (e) => handleCenter(e),
              }}
              icon={customIcon.current}
            />
          )}
          {newPoint.length > 0 &&
            newPoint.map((el, index) => {
              return (
                <Marker
                  position={el}
                  icon={newCustomIcon.current}
                  eventHandlers={{
                    mousedown: (e) => {
                      dispatch(addGeozonePointIndex({ coord: el, index: index }))
                    },
                  }}
                />
              )
            })}
        </Polygon>
      )}
      {edit && points.length >= 1 && (
        <>
          <Polyline
            positions={points}
            pathOptions={{
              color: colorFigure,
              fillOpacity: opacityFigure,
              weight: lineWidth,
            }}
          >
            {points.map((position, index) => {
              const isFirstMarker = index === 0
              return (
                <Marker
                  key={index}
                  position={position}
                  draggable={true}
                  eventHandlers={{
                    click: () => (isFirstMarker ? clickLastPoint() : null),
                    move: (e) => moveMarker(e, index),
                  }}
                  icon={customIcon.current}
                />
              )
            })}
          </Polyline>
          {transparent && (
            <Polyline
              positions={[points[points.length - 1], transparent]}
              dashArray="5, 10"
              pathOptions={{
                color: colorFigure,
                fillOpacity: opacityFigure,
                weight: lineWidth,
              }}
            />
          )}
        </>
      )}
    </>
  )
}

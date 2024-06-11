import React, { useMemo, useRef, useState } from "react"
import { PolylineDecorator } from "../PolylineDecorator/PolylineDecorator"
import { Marker, Polyline, useMapEvent } from "react-leaflet"
import { LatLngExpression, latLng } from "leaflet"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import L from "leaflet"

type propsType = {
  points: any
  pathOptions: {
    color: string
    weight: number
    opacity: number
  }
  eventHandlers: {
    mousedown: (e) => void
    click: (e) => void
    locationfound?: (e) => void
  }
  idTrack: number
}

export const SwitchDecoratorLine: React.FC<propsType> = ({
  points,
  eventHandlers,
  pathOptions,
  idTrack,
}) => {
  const [isView, setIsView] = useState(true)
  const pointInfo = useSelector((state: RootState) => state.map.pointInfo)
  const positions = points.map((i) => [i.lt, i.ln])
  const zoomCurrent = useMemo(() => {
    let distance = 0
    positions.forEach((point, index) => {
      if (index === positions.length - 1) return
      distance = distance + latLng(point).distanceTo(positions[index + 1])
    })

    if (distance < 1000) {
      return 15
    }
    if (distance < 1500) {
      return 14
    }
    if (distance < 15000) {
      return 10
    }
    if (distance < 150000) {
      return 7
    }
    if (distance < 500000) {
      return 5
    }
    if (distance < 1000000) {
      return 3
    }
    if (distance < 1200000) {
      return 1
    }
    return 0
  }, [points])

  useMapEvent("zoom", (e) => {
    if (e.target.getZoom() < zoomCurrent) {
      setIsView(false)
      return
    }
    setIsView(true)
  })
  const customIcon = L.divIcon({
    html: `<div>${pointInfo && points[pointInfo.index].id}</div>`,
    className: "popup-track",
  })
  return (
    <>
      {pointInfo && pointInfo.idTrack === idTrack && (
        <Marker
          position={[points[pointInfo.index].lt, points[pointInfo.index].ln]}
          icon={customIcon}
        />
      )}
      {isView ? (
        <PolylineDecorator
          positions={positions}
          pathOptions={pathOptions}
          eventHandlers={eventHandlers}
        />
      ) : (
        <Polyline positions={positions} pathOptions={pathOptions} eventHandlers={eventHandlers} />
      )}
    </>
  )
}

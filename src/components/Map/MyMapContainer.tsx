import { LatLng, LatLngExpression } from "leaflet"

import React, { useEffect, useState } from "react"
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
  TileLayer,
  useMap,
} from "react-leaflet"
import { MapEditor } from "./MapEditor/MapEditor"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { MenuEditor } from "./MenuEditor/MenuEditor"
import { useDispatch } from "react-redux"
import { ContextMenu } from "./ContextMenu/ContextMenu"
import {
  setCreatorFigure,
  setIsOpenMenuFigure,
  setIsOpenMenuMap,
  setIsOpenMenuTrack,
  setMap,
} from "./../../store/reducers/map/map"
import { removeGeozone } from "./../../store/reducers/security/security"
import { Track } from "./Track/Track"
import { IGeozone } from "@/interfaces/geozone"
import { DateTime } from "ts-luxon"

type propsType = {
  center: LatLngExpression
  zoomMap: number
  children?: React.ReactNode
  isEditor?: boolean
  isOpenMenuFigure: boolean
  chekedGeozone?: IGeozone[]
  tracks?: any
}

export const MyMapContainer: React.FC<propsType> = (props) => {
  const dispatch = useDispatch()

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (event: any) => {
    setMenuPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <div
      style={{ width: "100%", height: "94vh", position: "relative", zIndex: 1 }}
      onClick={(e) => {
        if (props.tracks) {
          dispatch(setIsOpenMenuMap(false))
          dispatch(setIsOpenMenuFigure(false))
          props.tracks.forEach((i, index) => {
            dispatch(setIsOpenMenuTrack({ id: index, value: false }))
          })
        }
      }}
    >
      <MapContainer
        center={props.center}
        zoom={props.zoomMap}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        className="container-map"
      >
        {props?.children && props.children}
        <SetMap />
        {props.tracks &&
          props.tracks.map((track, index) => {
            console.log(track)
            return <Track track={track} index={index} />
          })}

        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!props.isEditor &&
          props.chekedGeozone &&
          props.chekedGeozone.map((geozone, key) => {
            if (geozone.geometry_type_id === 1) {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",

                      onClickBtn: () => {
                        dispatch(setCreatorFigure(geozone))
                      },
                    },
                    {
                      label: "Удалить геозону",
                      onClickBtn: () => {
                        dispatch(removeGeozone(geozone.uid))
                      },
                    },
                  ]}
                  menuPosition={menuPosition}
                  menuVisible={props.isOpenMenuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Rectangle
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
                      fillOpacity: geozone.transparency / 100,
                    }}
                    bounds={[
                      [geozone.geozone_points[0].lat, geozone.geozone_points[0].lng],
                      [geozone.geozone_points[1].lat, geozone.geozone_points[1].lng],
                    ]}
                    eventHandlers={{
                      mousedown: (e) => {
                        e.originalEvent.preventDefault()
                        if (e.originalEvent.button === 2) {
                          dispatch(setIsOpenMenuFigure(true))

                          setMenuPosition({
                            x: e.originalEvent.clientX,
                            y: e.originalEvent.clientY,
                          })
                        }
                        dispatch(setIsOpenMenuMap(false))
                        e.originalEvent.stopPropagation()
                      },
                      click: () => {
                        dispatch(setIsOpenMenuFigure(false))
                      },
                    }}
                    key={key}
                  />
                </ContextMenu>
              )
            }
            if (geozone.geometry_type_id === 0 && geozone.latitude && geozone.longitude) {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        dispatch(setCreatorFigure(geozone))
                      },
                    },
                    {
                      label: "Удалить геозону",
                      onClickBtn: () => {
                        dispatch(removeGeozone(geozone.uid))
                      },
                    },
                  ]}
                  menuPosition={menuPosition}
                  menuVisible={props.isOpenMenuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Circle
                    center={[geozone.latitude, geozone.longitude]}
                    radius={geozone.radius ? geozone.radius : 500}
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
                      fillOpacity: geozone.transparency / 100,
                    }}
                    key={key}
                    eventHandlers={{
                      mousedown: (e) => {
                        e.originalEvent.preventDefault()
                        if (e.originalEvent.button === 2) {
                          dispatch(setIsOpenMenuFigure(true))
                          setMenuPosition({
                            x: e.originalEvent.clientX,
                            y: e.originalEvent.clientY,
                          })
                        }
                        dispatch(setIsOpenMenuMap(false))
                        e.originalEvent.stopPropagation()
                      },
                      click: () => {
                        dispatch(setIsOpenMenuFigure(false))
                      },
                    }}
                  />
                </ContextMenu>
              )
            }
            if (geozone.geometry_type_id === 2) {
              console.log(geozone.line_width)
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        dispatch(setCreatorFigure(geozone))
                      },
                    },
                    {
                      label: "Удалить геозону",
                      onClickBtn: () => {
                        dispatch(removeGeozone(geozone.uid))
                      },
                    },
                  ]}
                  menuPosition={menuPosition}
                  menuVisible={props.isOpenMenuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Polygon
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
                      fillOpacity: geozone.transparency / 100,
                    }}
                    positions={geozone.geozone_points
                      .map((item) => {
                        return [item.lat, item.lng]
                      })
                      .splice(0, geozone.geozone_points.length - 1)}
                    eventHandlers={{
                      mousedown: (e) => {
                        e.originalEvent.preventDefault()
                        if (e.originalEvent.button === 2) {
                          dispatch(setIsOpenMenuFigure(true))
                          setMenuPosition({
                            x: e.originalEvent.clientX,
                            y: e.originalEvent.clientY,
                          })
                        }
                        dispatch(setIsOpenMenuMap(false))
                        e.originalEvent.stopPropagation()
                      },
                      click: () => {
                        dispatch(setIsOpenMenuFigure(false))
                      },
                    }}
                  />
                </ContextMenu>
              )
            }
            if (geozone.geometry_type_id === 3) {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        dispatch(setCreatorFigure(geozone))
                      },
                    },
                    {
                      label: "Удалить геозону",
                      onClickBtn: () => {
                        dispatch(removeGeozone(geozone.uid))
                      },
                    },
                  ]}
                  menuPosition={menuPosition}
                  menuVisible={props.isOpenMenuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Polyline
                    positions={geozone.geozone_points.map((item) => {
                      return [item.lat, item.lng]
                    })}
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
                      fillOpacity: geozone.transparency / 100,
                    }}
                    eventHandlers={{
                      mousedown: (e) => {
                        e.originalEvent.preventDefault()
                        if (e.originalEvent.button === 2) {
                          dispatch(setIsOpenMenuFigure(true))
                          setMenuPosition({
                            x: e.originalEvent.clientX,
                            y: e.originalEvent.clientY,
                          })
                        }
                        dispatch(setIsOpenMenuMap(false))
                        e.originalEvent.stopPropagation()
                      },
                      click: () => {
                        dispatch(setIsOpenMenuFigure(false))
                      },
                    }}
                  />
                </ContextMenu>
              )
            }
          })}
        {props.isEditor && <MapEditor />}
      </MapContainer>
      {props.isEditor && <MenuEditor />}
    </div>
  )
}

const SetMap = () => {
  const dispatch = useDispatch()
  const map = useMap()
  useEffect(() => {
    dispatch(setMap(map))
  })
  return null
}

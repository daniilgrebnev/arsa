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
  setIsOpenMenuFigure,
  setIsOpenMenuMap,
  setIsOpenMenuTrack,
  setMap,
} from "./../../store/reducers/map/map"
import { removeGeozone } from "./../../store/reducers/security/security"
import { Track } from "./Track/Track"

type propsType = {
  center: LatLngExpression
  zoomMap: number
  children?: React.ReactNode
}

export const MyMapContainer: React.FC<propsType> = (props) => {
  const isEditor = useSelector((state: RootState) => state.map.editMap)
  const dispatch = useDispatch()

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const menuFigure = useSelector((state: RootState) => state.map.isOpenMenuFigure)

  const handleContextMenu = (event: any) => {
    setMenuPosition({ x: event.clientX, y: event.clientY })
  }

  const chekedGeozone = useSelector((state: RootState) => state.security.geozonesCheked)

  const tracks = useSelector((state: RootState) => state.map.tracks)

  return (
    <div
      style={{ width: "100%", height: "94vh", position: "relative", zIndex: 1 }}
      onClick={(e) => {
        dispatch(setIsOpenMenuMap(false))
        dispatch(setIsOpenMenuFigure(false))
        tracks.forEach((i, index) => {
          dispatch(setIsOpenMenuTrack({ id: index, value: false }))
        })
      }}
    >
      <MapContainer
        center={props.center}
        zoom={props.zoomMap}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        className="container-map"
      >
        <SetMap />
        {!isEditor &&
          tracks.map((track, index) => {
            return <Track track={track} index={index} />
          })}

        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isEditor &&
          chekedGeozone.map((geozone, key) => {
            if (geozone.geometry_type_id === "rectangle") {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",

                      onClickBtn: () => {
                        console.log("red")
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
                  menuVisible={menuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Rectangle
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
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
            if (geozone.geometry_type_id === "circle" && geozone.latitube && geozone.longitube) {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        console.log("red")
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
                  menuVisible={menuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Circle
                    center={[geozone.latitube, geozone.longitube]}
                    radius={geozone.radius ? geozone.radius : 500}
                    pathOptions={{
                      color: geozone.color,
                      weight: geozone.line_width,
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
            if (geozone.geometry_type_id === "polygon") {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        console.log("red")
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
                  menuVisible={menuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Polygon
                    positions={geozone.geozone_points.map((item) => {
                      return [item.lat, item.lng]
                    })}
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
            if (geozone.geometry_type_id === "line") {
              return (
                <ContextMenu
                  btnMenu={[
                    {
                      label: "Редактировать геозону",
                      onClickBtn: () => {
                        console.log("red")
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
                  menuVisible={menuFigure}
                  contextMenu={handleContextMenu}
                  setMenuVisible={(visible) => dispatch(setIsOpenMenuFigure(visible))}
                >
                  <Polyline
                    positions={geozone.geozone_points.map((item) => {
                      return [item.lat, item.lng]
                    })}
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
        {isEditor && <MapEditor />}
      </MapContainer>
      {isEditor && <MenuEditor />}
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

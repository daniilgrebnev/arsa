import { RootState } from "@/store/store"

import { ContextMenu } from "../components/Map/ContextMenu/ContextMenu"
import { MyMapContainer } from "../components/Map/MyMapContainer"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  setAllGeozoneInfo,
  setEditMap,
  setIsOpenMenuFigure,
  setIsOpenMenuMap,
  setIsOpenMenuTrack,
  setTrackAll,
} from "../store/reducers/map/map"
import { getGeozones, getTrack } from "../store/reducers/map/mapThunk"
import { SettingsEvents } from "./../components/Map/SettingsEvents/SettingsEvents"

export const MapPage = () => {
  const dispatch = useDispatch<any>()
  const isOpen = useSelector((state: RootState) => state.map.isOpenMenuMap)
  const tracks = useSelector((state: RootState) => state.map.tracks)
  // const chekedGeozone = useSelector((state: RootState) => state.security.geozonesCheked)
  const chekedGeozone = useSelector((state: RootState) => state.geoZones.checkedGeoZones)
  const geozonesInfo = useSelector((state: RootState) => state.map.infoGeozones)
  const menuFigure = useSelector((state: RootState) => state.map.isOpenMenuFigure)
  const isEditor = useSelector((state: RootState) => state.map.editMap)
  const vehicleCheked = useSelector((state: RootState) => state.vehicles.checkedVehicles)
  const startDate = useSelector((state: RootState) => state.security.startTiming)
  const endDate = useSelector((state: RootState) => state.security.endTiming)

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (event: any) => {
    event.preventDefault()
    if (event.target.classList[0] !== "container-map") return
    setMenuPosition({ x: event.clientX, y: event.clientY })

    dispatch(setIsOpenMenuFigure(false))
    tracks.forEach((i, index) => {
      dispatch(setIsOpenMenuTrack({ id: index, value: false }))
    })
    dispatch(setIsOpenMenuMap(true))
  }

  let chekedGeozoneA: string[] = ["001e3fd1-4d85-17a8-903a-6bac4f978829"]

  useEffect(() => {
    if (vehicleCheked.length > 5) {
      alert("Можно показать не более 5 треков")
      return
    }
    if (vehicleCheked.length === 0) {
      dispatch(setTrackAll([]))
    }
    if (vehicleCheked.length > 0) {
      dispatch(getTrack(vehicleCheked, startDate, endDate))
    }
  }, [vehicleCheked, endDate, startDate])

  useEffect(() => {
    if (chekedGeozone.length > 5) {
      alert("Можно показать не более 5 треков")
      return
    }
    if (chekedGeozone.length === 0) {
      dispatch(setAllGeozoneInfo([]))
    }
    if (chekedGeozone.length > 0) {
      dispatch(getGeozones(chekedGeozone))
    }
  }, [chekedGeozone, startDate, endDate])

  return (
    <div>
      <ContextMenu
        btnMenu={[
          {
            label: "Создать геозону",
            onClickBtn: () => {
              dispatch(setEditMap(true))
            },
          },
        ]}
        menuPosition={menuPosition}
        menuVisible={isOpen}
        contextMenu={handleContextMenu}
        setMenuVisible={(visible) => {
          dispatch(setIsOpenMenuMap(visible))
        }}
      >
        <MyMapContainer
          center={{ lat: 51.64159, lng: 39.150995 }}
          zoomMap={7}
          tracks={tracks}
          isEditor={isEditor}
          isOpenMenuFigure={menuFigure}
          chekedGeozone={geozonesInfo}
        >
          <SettingsEvents />
        </MyMapContainer>
      </ContextMenu>
    </div>
  )
}

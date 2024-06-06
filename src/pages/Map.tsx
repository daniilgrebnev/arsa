import { RootState } from "@/store/store"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ContextMenu } from "../components/Map/ContextMenu/ContextMenu"
import { MyMapContainer } from "../components/Map/MyMapContainer"
import {
  setEditMap,
  setIsOpenMenuFigure,
  setIsOpenMenuMap,
  setIsOpenMenuTrack,
} from "./../store/reducers/map/map"

export const MapPage = () => {
  const dispatch = useDispatch<any>()
  const isOpen = useSelector((state: RootState) => state.map.isOpenMenuMap)
  const tracks = useSelector((state: RootState) => state.map.tracks)
  const vehicleCheked = useSelector((state: RootState) => state.vehicles)
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

  useEffect(() => {
    if (tracks.length > 5) {
      alert("Можно показать не более 5 треков")
      return
    }
    if (vehicleCheked) {
      // dispatch(
      //   getTrack(
      //     // vehicleCheked.map((el) => el.vehicle_uid),
      //     startDate,
      //     endDate,
      //   ),
      // )
    }
  }, [vehicleCheked, endDate, startDate])

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
        <MyMapContainer center={{ lat: 51.64159, lng: 39.150995 }} zoomMap={7} />
      </ContextMenu>
    </div>
  )
}

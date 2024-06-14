import { AppDispatch } from "./../../store"
import { getGeozone, getInfoPointEvent, getTrackAPI } from "./../../../api/apiGlobal"
import { addTrack, setAllGeozoneInfo, setTrackAll } from "./map"
import { LatLng } from "leaflet"

export const getTrack = (uids: string[], start_time: any, end_time: any) => {
  return async (dispatch: AppDispatch) => {
    debugger
    const tracks = await Promise.all(
      uids.map(async (uid) => {
        const resTrack = await getTrackAPI(uid, start_time, end_time)
        const resEvents = await getInfoPointEvent(uid, start_time, end_time)
        return { track: resTrack.data, events: resEvents.data, uid: uid }
      }),
    )
    debugger
    dispatch(setTrackAll([]))
    tracks.forEach((track) => {
      if (track.track.length > 0) {
        dispatch(addTrack(track))
      }
    })
  }
}

export const getGeozones = (uids: string[]) => {
  return async (dispatch: AppDispatch) => {
    const res = await getGeozone(uids)
    debugger
    dispatch(
      setAllGeozoneInfo(
        res.data.map((i) => {
          let newGeozone = { ...i }
          newGeozone.geozone_points = newGeozone.geozone_points.map((point) => {
            return new LatLng(point.lat, point.lon)
          })
          return newGeozone
        }),
      ),
    )
  }
}

export const removeGeozoneInfo = (uid: string) => {
  return async (dispath: AppDispatch) => {
    debugger
  }
}

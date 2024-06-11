import { AppDispatch } from "./../../store"
import { getInfoPointEvent, getTrackAPI } from "./../../../api/apiGlobal"
import { addTrack, setTrackAll } from "./map"

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

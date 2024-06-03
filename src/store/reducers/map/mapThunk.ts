import { AppDispatch } from "./../../store"
import { getInfoPointEvent, getTrackAPI } from "./../../../api/apiGlobal"
import { addTrack, setTrackAll } from "./map"

export const getTrack = (uids: string[], start_time: any, end_time: any) => {
  return async (dispatch: AppDispatch) => {
    const tracks = await Promise.all(
      uids.map(async (uid) => {
        const resTrack = await getTrackAPI(
          uid,
          Math.round(start_time / 1000),
          Math.round(end_time / 1000),
        )
        const resEvents = await getInfoPointEvent(
          uid,
          Math.round(start_time / 1000),
          Math.round(end_time / 1000),
        )
        return { track: resTrack.data, events: resEvents.data, uid: uid }
      }),
    )
    dispatch(setTrackAll([]))
    tracks.forEach((track) => {
      if (track.track.length > 0) {
        dispatch(addTrack(track))
      }
    })
  }
}

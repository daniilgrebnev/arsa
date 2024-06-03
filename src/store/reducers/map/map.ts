import { IGeozone } from "@/interfaces/geozone"
import { Tfigure } from "@/types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import L from "leaflet"

interface Imap {
  editMap: boolean
  isOpenMenuMap: boolean
  creatorFigure: IGeozone
  isOpenMenuFigure: boolean
  colors: ["#25992f", "#ff0000", "#0600ff", "#ff00c6", "#9f00ff", "#ff7800", "#000", "#8800d9"]
  tracks: Array<{
    data: {
      dr: number
      ed: number
      id: number
      ln: number
      lt: number
      mb: number
    }[]
    menuOpen: boolean
    events: any
    uid: string
  }>
  pointInfo: { index: number; idTrack: number } | null
  map: any
}

const initialState: Imap = {
  editMap: false,
  isOpenMenuMap: false,
  isOpenMenuFigure: false,
  creatorFigure: {
    geozone_name: "Название",
    color: "#ff6801",
    uid: "2435qwe3245",
    geozone_type_id: 0,
    latitube: null,
    longitube: null,
    radius: 0,
    line_width: 2,
    geometry_type_id: "rectangle",
    use_as_address: false,
    image_url: null,
    geozone_points: [],
    comment: "",
    account_id: 654546,
    transparency: 0.5,
  },
  colors: ["#25992f", "#ff0000", "#0600ff", "#ff00c6", "#9f00ff", "#ff7800", "#000", "#8800d9"],
  tracks: [],
  pointInfo: null,
  map: null,
}

const mapSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTrack(state: Imap, action: PayloadAction<any>) {
      state.tracks = [
        ...state.tracks,
        {
          data: action.payload.track,
          uid: action.payload.uid,
          menuOpen: false,
          events: action.payload.events,
        },
      ]
      if (action.payload.track.length > 0) {
        const line = L.polyline(action.payload.track.map((el) => [el.lt, el.ln]))
        const bounds = line.getBounds()
        state.map.fitBounds(bounds)
      }
    },
    setTrackAll(state: Imap, action: PayloadAction<any>) {
      state.tracks = action.payload
    },
    clearFigure(state: Imap) {
      state.creatorFigure = {
        geozone_name: "Название",
        color: "#ff6801",
        uid: "2435qwe3245",
        geozone_type_id: 0,
        latitube: 0,
        longitube: 0,
        radius: 0,
        line_width: 1,
        geometry_type_id: "rectangle",
        use_as_address: false,
        image_url: null,
        geozone_points: [],
        comment: "",
        account_id: 654546,
        transparency: 0.5,
      }
    },
    setEditMap(state: Imap, action: PayloadAction<boolean>) {
      console.log(action.payload)
      state.editMap = action.payload
    },
    setIsOpenMenuMap(state: Imap, action: PayloadAction<boolean>) {
      state.isOpenMenuMap = action.payload
    },
    setIsOpenMenuFigure(state: Imap, action: PayloadAction<boolean>) {
      state.isOpenMenuFigure = action.payload
    },
    setTypeFigure(state: Imap, action: PayloadAction<Tfigure>) {
      state.creatorFigure.geometry_type_id = action.payload
      if (action.payload === "circle") {
        if (!state.creatorFigure.latitube && !state.creatorFigure.longitube) {
          state.creatorFigure.geozone_points = []
        }
        state.creatorFigure.geozone_points = state.creatorFigure.geozone_points.filter((point) => {
          return (
            point.distanceTo({
              lat: state.creatorFigure.latitube,
              lng: state.creatorFigure.longitube,
            }) === state.creatorFigure.radius
          )
        })
      }
      if (action.payload === "line") {
        state.creatorFigure.latitube = null
        state.creatorFigure.longitube = null
        state.creatorFigure.radius = null
      }
    },
    setColorFigure(state: Imap, action: PayloadAction<string>) {
      state.creatorFigure.color = action.payload
    },
    setOpacityFigure(state: Imap, action: PayloadAction<number>) {
      state.creatorFigure.transparency = action.payload
    },
    setLineWidth(state: Imap, action: PayloadAction<number>) {
      state.creatorFigure.line_width = action.payload
    },
    setNameGeozone(state: Imap, action: PayloadAction<string>) {
      state.creatorFigure.geozone_name = action.payload
    },
    setCommentGeozone(state: Imap, action: PayloadAction<string>) {
      state.creatorFigure.comment = action.payload
    },
    setGeozonePoint(state: Imap, action: PayloadAction<any>) {
      state.creatorFigure.geozone_points = action.payload
    },
    addGeozonePoint(state: Imap, action: PayloadAction<any>) {
      state.creatorFigure.geozone_points = [...state.creatorFigure.geozone_points, action.payload]
    },
    setLatLng(state: Imap, action: PayloadAction<any>) {
      state.creatorFigure.latitube = action.payload.lat
      state.creatorFigure.longitube = action.payload.lng
    },
    setRadius(state: Imap, action: PayloadAction<number>) {
      state.creatorFigure.radius = action.payload
    },
    setFigure(state: Imap, action: PayloadAction<any>) {
      state.creatorFigure = action.payload
    },
    setIsOpenMenuTrack(state: Imap, action: PayloadAction<{ id: number; value: boolean }>) {
      state.tracks = state.tracks.map((i, index) => {
        if (index === action.payload.id) {
          let newTrack = { ...i }
          newTrack.menuOpen = action.payload.value
          return newTrack
        }
        return i
      })
    },
    setPointInfo(state: Imap, action: PayloadAction<any>) {
      state.pointInfo = action.payload
    },
    setMap(state: Imap, action: PayloadAction<any>) {
      state.map = action.payload
    },
  },
})

export const {
  setMap,
  addTrack,
  setTrackAll,
  clearFigure,
  setEditMap,
  setIsOpenMenuMap,
  setTypeFigure,
  setCommentGeozone,
  setNameGeozone,
  setColorFigure,
  setOpacityFigure,
  setLineWidth,
  addGeozonePoint,
  setGeozonePoint,
  setLatLng,
  setRadius,
  setIsOpenMenuFigure,
  setFigure,
  setIsOpenMenuTrack,
  setPointInfo,
} = mapSlice.actions
export default mapSlice.reducer

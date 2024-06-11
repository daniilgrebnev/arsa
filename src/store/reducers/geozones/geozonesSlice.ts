import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IGeoZoneState {
  data: "loading" | "error" | null | any
  checkedGeoZones: string[]
}

const initialState: IGeoZoneState = {
  data: null,
  checkedGeoZones: [],
}

const geoZonesSlice = createSlice({
  name: "geoZones",
  initialState,
  reducers: {
    setGeoZonesData: (
      state: IGeoZoneState,
      action: PayloadAction<"loading" | "error" | null | any>,
    ) => {
      state.data = action.payload
    },
    setCheckedGeoZones: (state: IGeoZoneState, action: PayloadAction<string[]>) => {
      state.checkedGeoZones = action.payload
    },
  },
})

export const { setGeoZonesData, setCheckedGeoZones } = geoZonesSlice.actions
export default geoZonesSlice.reducer

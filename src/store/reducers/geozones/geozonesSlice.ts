import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IGeoZoneState {
  data: "loading" | "error" | null | any
  checkedGeoZones: string[]
  filteredData: any
  isSearched: boolean
}

const initialState: IGeoZoneState = {
  data: null,
  checkedGeoZones: [],
  filteredData: null,
  isSearched: false,
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
      state.filteredData = typeof action.payload !== "string" ? action.payload : null
    },
    setCheckedGeoZones: (state: IGeoZoneState, action: PayloadAction<string[]>) => {
      state.checkedGeoZones = action.payload
    },
    setGeoZonesFilteredData: (state: IGeoZoneState, action: PayloadAction<any>) => {
      state.filteredData = action.payload
    },
    setGeoZonesSearched: (state: IGeoZoneState, action: PayloadAction<boolean>) => {
      state.isSearched = action.payload
    },
    setDefaultGeoZonesFilteredData: (state: IGeoZoneState) => {
      state.filteredData = state.data
    },
  },
})

export const {
  setGeoZonesData,
  setCheckedGeoZones,
  setGeoZonesSearched,
  setGeoZonesFilteredData,
  setDefaultGeoZonesFilteredData,
} = geoZonesSlice.actions
export default geoZonesSlice.reducer

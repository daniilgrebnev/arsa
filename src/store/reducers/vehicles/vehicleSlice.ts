import { IVehicleRes } from "@/interfaces/vehicleTree"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IVehicleData } from "./../../../interfaces/vehicleTree"

type TVehicleData = IVehicleRes | "error" | "loading" | null
interface IVehicleState {
  data: TVehicleData
  filteredData: IVehicleData[]
  checkedVehicles: string[]
  isSearch: boolean
}

const initialState: IVehicleState = {
  data: null,
  filteredData: [],
  checkedVehicles: [],
  isSearch: false,
}

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicleData: (state: IVehicleState, action: PayloadAction<TVehicleData>) => {
      state.data = action.payload
      state.filteredData =
        typeof action.payload != "string" && action.payload ? action.payload.data : []
    },
    setCheckedVehicles: (state: IVehicleState, action: PayloadAction<string[]>) => {
      state.checkedVehicles = action.payload
    },
    setFilteredData: (state: IVehicleState, action: PayloadAction<IVehicleData[]>) => {
      state.filteredData = action.payload
    },
    setDefaultFilteredData: (state: IVehicleState) => {
      state.filteredData = typeof state.data != "string" && state.data ? state.data.data : []
    },
    setIsSearch: (state: IVehicleState, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload
    },
  },
})

export const {
  setVehicleData,
  setCheckedVehicles,
  setFilteredData,
  setDefaultFilteredData,
  setIsSearch,
} = vehicleSlice.actions
export default vehicleSlice.reducer

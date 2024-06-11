import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IDriverData {
  account_id: number
  drivers?: IDriver[]
  group_name: string
  id: number
  is_root: boolean
  level: number
  parent_id?: number
  role_id: number
}

export interface IDriver {
  account_id: number
  birth_date: number
  comment: string
  dismissal_date: number
  driver_code: number
  driver_uid: string
  employment_date: number
  first_name: string
  patronymic: string
  phone: string
  surname: string
}

interface IDriverState {
  data: IDriverData[] | "loading" | "error" | null
  checkedDrivers: string[]
  filteredData: IDriverData[] | null
  isSearch: boolean
}
const initialState: IDriverState = {
  data: null,
  checkedDrivers: [],
  filteredData: null,
  isSearch: false,
}

const driverSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setDriversData: (
      state: IDriverState,
      action: PayloadAction<IDriverData[] | "loading" | "error" | null>,
    ) => {
      state.data = action.payload
      state.filteredData = typeof action.payload != "string" ? action.payload : null
    },
    setCheckedDrivers: (state: IDriverState, action: PayloadAction<string[]>) => {
      state.checkedDrivers = action.payload
    },
    setDriversFilteredData: (state: IDriverState, action: PayloadAction<IDriverData[]>) => {
      state.filteredData = action.payload
    },
    setDriverSearch: (state: IDriverState, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload
    },
    setDefaultDriverFilterData: (state: IDriverState) => {
      state.filteredData = typeof state.data != "string" && state.data != null ? state.data : []
    },
  },
})

export const {
  setDriversData,
  setCheckedDrivers,
  setDriversFilteredData,
  setDriverSearch,
  setDefaultDriverFilterData,
} = driverSlice.actions

export default driverSlice.reducer

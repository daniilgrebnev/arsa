import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IFuelData {
  approximated: number
  event_date: number
  raw: number
}

interface IFuelState {
  isOpen: boolean
  data: IFuelData | null | "loading" | "error"
}

const initialState: IFuelState = {
  data: null,
  isOpen: false,
}

const fuelSlice = createSlice({
  name: " fuel",
  initialState,
  reducers: {
    setFuelData: (
      state: IFuelState,
      action: PayloadAction<IFuelData | null | "loading" | "error">,
    ) => {
      state.data = action.payload
    },
    setOpenFuel: (state: IFuelState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})
export const { setFuelData, setOpenFuel } = fuelSlice.actions

export default fuelSlice.reducer

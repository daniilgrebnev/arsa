import { ISwitchHistoryData } from "@/interfaces/switchHistory"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ISwitchTireHistoryState {
  data: ISwitchHistoryData[] | null
  isOpen: boolean
  removedItemId: number | null
  changeItem: ISwitchHistoryData | null
  rerenderHandler: boolean
}

const initialState: ISwitchTireHistoryState = {
  data: null,
  isOpen: false,
  removedItemId: null,
  changeItem: null,
  rerenderHandler: false,
}

const switchHistorySlice = createSlice({
  name: "switchHistory",
  initialState,
  reducers: {
    setSwitchHistoryData: (
      state: ISwitchTireHistoryState,
      action: PayloadAction<ISwitchHistoryData[] | null>
    ) => {
      state.data = action.payload
    },
    setOpenSwitchHistory: (state: ISwitchTireHistoryState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setRemoveSwitchHistory: (state: ISwitchTireHistoryState, action: PayloadAction<number>) => {
      state.data = state.data ? state.data.filter((item) => item.id !== action.payload) : null
    },
    setRerenderSwitchHistory: (state: ISwitchTireHistoryState) => {
      state.rerenderHandler = !state.rerenderHandler
    },
  },
})

export const {
  setSwitchHistoryData,
  setOpenSwitchHistory,
  setRemoveSwitchHistory,
  setRerenderSwitchHistory,
} = switchHistorySlice.actions
export default switchHistorySlice.reducer

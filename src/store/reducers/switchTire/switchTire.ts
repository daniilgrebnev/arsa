import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ISwitchHistoryTire {
  id: number
  wheel_id: number
  tireName: string
  description: string
}
interface ISwitchTireState {
  tireId: number | null
  tire: string
  isOpen: boolean
  isOpenChange: boolean
  switchHistoryTire: ISwitchHistoryTire | null
}

export interface ISwitchReq {
  id: number
  vehicle_uid: string
  wheel_model_id: number
  wheel_id: number
  start_date: number
  reason_replacement: string
}

interface ISetTire {
  id: number | null
  tire: string
}

const initialState: ISwitchTireState = {
  tireId: null,
  tire: "",
  isOpen: false,
  isOpenChange: false,
  switchHistoryTire: null,
}
const switchTireSlice = createSlice({
  name: "switchTire",
  initialState,
  reducers: {
    setOpenSwitch: (state: ISwitchTireState) => {
      state.isOpen = !state.isOpen
      state.isOpenChange = false
      state.tire = ""
      state.switchHistoryTire = null
      state.tireId = null
    },
    setOpenSwitchChange: (state) => {
      state.isOpenChange = !state.isOpenChange
    },
    setTire: (state: ISwitchTireState, action: PayloadAction<ISetTire>) => {
      state.tire = action.payload.tire
      state.tireId = action.payload.id
      state.isOpenChange = false
    },
    setSwitchHistoryTire: (
      state: ISwitchTireState,
      action: PayloadAction<ISwitchHistoryTire | null>
    ) => {
      state.isOpen = true
      state.switchHistoryTire = action.payload
    },
  },
})
export const { setOpenSwitch, setOpenSwitchChange, setTire, setSwitchHistoryTire } =
  switchTireSlice.actions
export default switchTireSlice.reducer

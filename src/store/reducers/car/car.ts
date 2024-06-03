import { IWheel } from "@/helpers/axlesInitter"
import { IWheel as IWheelW } from "@/helpers/getfullVehicleInfo"
import { ICar } from "@/interfaces/car"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ICarState {
  data: ICar | null | "loading" | "error"
  vehicle_uid: string
  widgetInfo: IWheelW | null
  wheel_id: number | null
  vehicle_wheel_info: IWheelW[] | null
  isOpenWidget: boolean
}

const initialState: ICarState = {
  data: null,
  vehicle_uid: "",
  widgetInfo: null,
  wheel_id: null,
  vehicle_wheel_info: null,
  isOpenWidget: false,
}

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarData(state: ICarState, action: PayloadAction<any>) {
      state.data = action.payload
    },
    setVehicleInfo(state: ICarState, action: PayloadAction<IWheelW[] | null>) {
      state.vehicle_wheel_info = action.payload
    },
    setVehicleUID(state: ICarState, action: PayloadAction<string>) {
      state.vehicle_uid = action.payload
    },
    setWidgetInfo(state: ICarState, action: PayloadAction<IWheel | null>) {
      state.widgetInfo = action.payload
    },

    setWheelId(state: ICarState, action: PayloadAction<number | null>) {
      state.wheel_id = action.payload
      state.isOpenWidget = true
    },
    setCloseWidget(state: ICarState) {
      state.isOpenWidget = false
    },

    removeWidgetInfo(state: ICarState, action: PayloadAction<null>) {
      state.widgetInfo = null
    },
  },
})

export const {
  setCarData,
  setVehicleUID,
  setWidgetInfo,
  removeWidgetInfo,
  setVehicleInfo,
  setWheelId,
  setCloseWidget,
} = carSlice.actions
export default carSlice.reducer

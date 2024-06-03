import { IWheelChartQueryParams } from "@/api/apiGlobal"
import { IWheelChart } from "@/interfaces/wheelChart"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IActiveData {
  event_date: number
  pressure: number
  temp: number
}
export interface IDomainChart {
  min: string | number
  max: string | number
}

export interface IQueryChartData {
  vehicle_uid: string
  wheel_axes_id: number
  sensor_number: number
}

interface IWheelChartState {
  data: IWheelChart | null | "loading" | "error"
  queryData: IWheelChartQueryParams | null
  activeData: null | IActiveData
  domain: IDomainChart
  isOpen: boolean
  rerenderTrigger: boolean
}

const initialState: IWheelChartState = {
  data: null,
  queryData: null,
  activeData: null,
  isOpen: false,
  domain: {
    min: "dataMin + 10%",
    max: "dataMax + 10%",
  },
  rerenderTrigger: false,
}

const wheelChartSlice = createSlice({
  name: "wheelChart",
  initialState,
  reducers: {
    setWheelChartData(
      state: IWheelChartState,
      action: PayloadAction<IWheelChart | null | "loading" | "error">,
    ) {
      state.data = action.payload
    },
    setActiveWheelChartData(state: IWheelChartState, action: PayloadAction<IActiveData | null>) {
      state.activeData = action.payload
    },
    setDomain(state: IWheelChartState, action: PayloadAction<IDomainChart>) {
      state.domain = action.payload
    },
    setDefaultWheelChart(state: IWheelChartState) {
      state.data = null
      state.activeData = null
      state.isOpen = false
      state.domain = {
        min: "dataMin + 10%",
        max: "dataMax + 10%",
      }
    },

    setOpenCharts(state: IWheelChartState, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setChartsQueryBody(state: IWheelChartState, action: PayloadAction<IWheelChartQueryParams>) {
      state.queryData = action.payload
      state.isOpen = true
    },
  },
})
export const {
  setWheelChartData,
  setActiveWheelChartData,
  setDomain,
  setDefaultWheelChart,
  setOpenCharts,
  setChartsQueryBody,
} = wheelChartSlice.actions
export default wheelChartSlice.reducer

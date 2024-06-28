import { IData } from "@/interfaces/global"
import {
  IObjectSettingsData,
  IObjectSettingsDiag,
  IObjectSettingsMain,
  ISpeedControlViolation,
  IWheelAx,
} from "@/interfaces/objectSettings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { objectSettingsRuNames } from "../../../components/Layout/Settings/objectSettingsRuNames"
import { IDriverSettings } from "./../../../interfaces/objectSettings"
import { axleCreator } from "./objectTemplates/axleTemplate"
import { wheelCreator } from "./objectTemplates/wheelTemplate"

interface INewDataPropsType {
  id: number
  position: "left" | "right"
}
interface ISpeedViolationProps {
  field:
    | "max_limit"
    | "reg_limit"
    | "is_enabled"
    | "reg_time_limit"
    | "reg_critical_limit"
    | "use_road_signs_instead_max_limit"
  value: boolean | string
}
interface IDriverSettingsEvent {
  field:
    | "is_enabled"
    | "end_registration_by_removing_card"
    | "end_registration_by_turning_off_ignition"
    | "restore_registration_if_card_reapplied_within"
  value: boolean | number
}
interface IDriverSettingsCPM {
  field: "addr" | "func" | "regNo" | "dataSource" | "use_as_driver_code"
  value: boolean | number
}
export interface INewNormsPropsType {
  field: "pressure_norm" | "pressure_delta" | "temperature_max"
  id: number
  value: number
}
type IItemData = {
  tab: string
  title: string
  data:
    | IObjectSettingsMain
    | IObjectSettingsDiag
    | IDriverSettings
    | ISpeedControlViolation
    | IWheelAx[]
}
interface INewData {
  main: IObjectSettingsMain
  diag: IObjectSettingsDiag
  driver_settings: IDriverSettings
  speed_control_violation: ISpeedControlViolation
  wheel_axes: IWheelAx[]
}
interface ISettingState extends IData<IObjectSettingsData> {
  isOpen: boolean
  activeTab: string
  dataToView: IItemData[] | null
  newData: {
    main: IObjectSettingsMain | null
    diag: IObjectSettingsDiag | null
    driver_settings: IDriverSettings | null
    speed_control_violation: ISpeedControlViolation | null
    wheel_axes: IWheelAx[] | null
  }
}

const initialState: ISettingState = {
  data: null,
  isOpen: false,
  activeTab: "main",
  dataToView: null,
  newData: {
    main: null,
    diag: null,
    driver_settings: null,
    speed_control_violation: null,
    wheel_axes: null,
  },
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setOpenSettings: (state: ISettingState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setActiveMenuTab: (state: ISettingState, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setObjectSettingsData: (
      state: ISettingState,
      action: PayloadAction<IData<IObjectSettingsData>>,
    ) => {
      const dataFromApi = action.payload.data
      state.data = dataFromApi
      if (dataFromApi !== null && typeof dataFromApi != "string") {
        const arr: any = []
        for (let i = 0; Object.keys(dataFromApi).length > i; i++) {
          arr.push({
            tab: Object.keys(dataFromApi)[i],
            title: objectSettingsRuNames[Object.keys(dataFromApi)[i]],
            data: dataFromApi[Object.keys(dataFromApi)[i]],
          })
        }
        state.dataToView = arr
      }
      if (typeof state.data != "string" && state.data != null) {
        state.newData.main = state.data.main
        state.newData.diag = state.data.diag
        state.newData.driver_settings = state.data.driver_settings
        state.newData.wheel_axes = state.data.wheel_axes
        state.newData.speed_control_violation = state.data.speed_control_violation
      }
    },
    setNewData: (state: ISettingState) => {
      return
    },
    createAxle: (state: ISettingState) => {
      state.newData.wheel_axes?.push(axleCreator())
    },
    createWheel: (state: ISettingState, action: PayloadAction<INewDataPropsType>) => {
      const id = action.payload.id
      const position = action.payload.position
      if (id > 0) {
        switch (position) {
          case "left":
            state.newData.wheel_axes?.find((i) => i.id == id)?.wheels[0].push(wheelCreator())
            break
          case "right":
            state.newData.wheel_axes?.find((i) => i.id == id)?.wheels[1].push(wheelCreator())
        }
      } else {
        switch (position) {
          case "left":
            state.newData.wheel_axes
              ?.find((i) => i.innerAxleId == id)
              ?.wheels[0].push(wheelCreator())
            break
          case "right":
            state.newData.wheel_axes
              ?.find((i) => i.innerAxleId == id)
              ?.wheels[1].push(wheelCreator())
            break
        }
      }
    },
    removeWheel: (state: ISettingState, action: PayloadAction<number>) => {
      const id = action.payload
      console.log(id)

      if (state.newData.wheel_axes) {
        state.newData.wheel_axes = state.newData.wheel_axes.map((axle) => ({
          ...axle,
          wheels: axle.wheels.map((wheel) =>
            id > 0
              ? wheel.filter((item) => item.id !== id)
              : wheel.filter((item) => item.innerWheelId !== id),
          ),
        }))
      } else {
        state.newData.wheel_axes = null
      }
    },
    removeAxle: (state: ISettingState, action: PayloadAction<number>) => {
      const axleId = action.payload
      console.log(axleId)

      if (state.newData.wheel_axes) {
        if (axleId > 0) {
          state.newData.wheel_axes = state.newData.wheel_axes.filter((axle) => axle.id !== axleId)
        } else {
          state.newData.wheel_axes = state.newData.wheel_axes.filter(
            (axle) => axle.innerAxleId !== axleId,
          )
        }
      } else {
        state.newData.wheel_axes = null
      }
    },
    updateSensorNumber: (
      state: ISettingState,
      action: PayloadAction<{ wheelId: number; text: number }>,
    ) => {
      const { wheelId, text } = action.payload
      console.log(`Updating sensor number for wheelId: ${wheelId} with text: ${text}`)

      // Проверка, существует ли массив wheel_axes
      if (state.newData.wheel_axes) {
        // Обновление состояния
        state.newData.wheel_axes = state.newData.wheel_axes.map((axle) => ({
          ...axle,
          wheels: axle.wheels.map((wheelArray) =>
            wheelArray.map((wheel) =>
              (wheelId > 0 && wheel.id === wheelId) ||
              (wheelId <= 0 && wheel.innerWheelId === wheelId)
                ? { ...wheel, sensor_number: text }
                : wheel,
            ),
          ),
        }))
      }
    },
    updateNorms: (state: ISettingState, action: PayloadAction<INewNormsPropsType>) => {
      const { id, field, value } = action.payload
      if (id > 0) {
        const item = state.newData.wheel_axes?.find((i) => i.id === id)

        // Update the field if the item is found
        if (item) {
          item[field] = value
        }
      } else {
        const item = state.newData.wheel_axes?.find((i) => i.innerAxleId === id)

        // Update the field if the item is found
        if (item) {
          item[field] = value
        }
      }
    },
    updateDiagControl: (state: ISettingState, action: PayloadAction<boolean>) => {
      if (state.newData.diag) {
        state.newData.diag.control = action.payload
      } else {
        console.log("Непредвиденная ошибка")
      }
    },

    updateSpeedViolationData: (
      state: ISettingState,
      action: PayloadAction<ISpeedViolationProps | any>,
    ) => {
      const { field, value } = action.payload
      const valueType = typeof value
      const item = state.newData.speed_control_violation
      if (item) {
        if (typeof item[field] === "boolean" && valueType === "boolean") {
          item[field] = value
        } else if (typeof item[field] == "string" && valueType == "string") {
          item[field] = value
        }
      }
    },
    updateDriverSettingsEvents: (
      state: ISettingState,
      action: PayloadAction<IDriverSettingsEvent | any>,
    ) => {
      const { field, value } = action.payload
      const valueType = typeof value
      const item = state.newData.driver_settings?.driver_events
      console.log(value)
      if (item) {
        if (typeof item[field] === "boolean" && valueType === "boolean") {
          item[field] = value
        } else if (typeof item[field] == "number" && valueType == "number") {
          item[field] = value
        }
      }
    },
    updateDriverSettingsCPM: (
      state: ISettingState,
      action: PayloadAction<IDriverSettingsCPM | any>,
    ) => {
      const { field, value } = action.payload
      const valueType = typeof value
      const item = state.newData.driver_settings?.CustomProtocolMonitoring
      if (item) {
        if (typeof item[field] === "boolean" && valueType === "boolean") {
          item[field] = value
        } else if (typeof item[field] == "number" && valueType == "number") {
          item[field] = value
        }
      }
    },
    updateDriverSettingsEventsRRCRW: (state: ISettingState, action: PayloadAction<number>) => {
      if (state.newData.driver_settings && state.newData.driver_settings.driver_events) {
        state.newData.driver_settings.driver_events.restore_registration_if_card_reapplied_within =
          action.payload
      }
    },
  },
})

export const {
  setOpenSettings,
  setActiveMenuTab,
  setObjectSettingsData,
  createAxle,
  createWheel,
  removeWheel,
  removeAxle,
  updateSensorNumber,
  updateNorms,
  updateDiagControl,
  updateSpeedViolationData,
  updateDriverSettingsCPM,
  updateDriverSettingsEvents,
  updateDriverSettingsEventsRRCRW,
} = settingsSlice.actions
export default settingsSlice.reducer

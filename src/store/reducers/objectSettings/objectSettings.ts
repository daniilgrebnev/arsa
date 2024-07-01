import { IData } from "@/interfaces/global"
import {
  IObjectSettingsData,
  IObjectSettingsDiag,
  IObjectSettingsMain,
  ISpeedControlViolation,
  PressureNormKoef,
  Tpms,
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
  value: boolean | number
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
export interface IPlugins {
  id: number
  name: string
}
type IItemData = {
  tab: string
  title: string
  data:
    | IObjectSettingsMain
    | IObjectSettingsDiag
    | IDriverSettings
    | ISpeedControlViolation
    | Tpms[]
}
export interface INewData {
  main: IObjectSettingsMain
  diag: IObjectSettingsDiag
  driver_cards: IDriverSettings
  speed_control: ISpeedControlViolation
  tpms: Tpms
  vehicle_uid: string
}
export interface IAccounts {
  account_name: string
  create_date: number
  id: number
  is_control_user_agent: boolean
  is_enabled: boolean
  level: number
  parent_id?: number
  rights: number
  role_id: number
}
interface ISettingState extends IData<IObjectSettingsData> {
  [x: string]: any
  accounts: IAccounts[] | null | "error" | "loading"
  plugins: IPlugins[] | null | "error" | "loading"
  isOpen: boolean
  activeTab: string
  dataToView: IItemData[] | null
  newData: {
    main: IObjectSettingsMain | null
    diag: IObjectSettingsDiag | null
    driver_cards: IDriverSettings | null
    speed_control: ISpeedControlViolation | null
    tpms: Tpms | null
    vehicle_uid: string
  }
}

const initialState: ISettingState = {
  data: null,
  accounts: [],
  plugins: null,
  isOpen: false,
  activeTab: "diag",
  dataToView: null,
  newData: {
    main: null,
    diag: null,
    driver_cards: null,
    speed_control: null,
    tpms: null,
    vehicle_uid: "",
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
      if (
        dataFromApi !== null &&
        typeof dataFromApi != "string" &&
        typeof state.data != "string" &&
        state.data != null
      ) {
        const arr: any = []
        for (let i = 0; Object.keys(dataFromApi).length > i; i++) {
          arr.push({
            tab: Object.keys(dataFromApi)[i],
            title: objectSettingsRuNames[Object.keys(dataFromApi)[i]],
            data: dataFromApi[Object.keys(dataFromApi)[i]],
          })
        }
        state.newData.main = state.data.main
        state.newData.diag = state.data?.diag
        state.newData.driver_cards = state.data?.driver_cards
        state.newData.tpms = state.data?.tpms
        state.newData.speed_control = state.data?.speed_control
        state.dataToView = arr
      }
    },
    setNewData: (state: ISettingState) => {
      return
    },
    createAxle: (state: ISettingState) => {
      state.newData.tpms?.wheel_axes?.push(axleCreator())
    },
    createWheel: (state: ISettingState, action: PayloadAction<INewDataPropsType>) => {
      const id = action.payload.id
      const position = action.payload.position
      if (id > 0) {
        switch (position) {
          case "left":
            state.newData.tpms?.wheel_axes
              ?.find((i) => i.id == id)
              ?.wheels[0].push(wheelCreator("L"))
            break
          case "right":
            state.newData.tpms?.wheel_axes
              ?.find((i) => i.id == id)
              ?.wheels[1].push(wheelCreator("R"))
        }
      } else {
        switch (position) {
          case "left":
            state.newData.tpms?.wheel_axes
              ?.find((i) => i.innerAxleId == id)
              ?.wheels[0].push(wheelCreator("L"))
            break
          case "right":
            state.newData.tpms?.wheel_axes
              ?.find((i) => i.innerAxleId == id)
              ?.wheels[1].push(wheelCreator("R"))
            break
        }
      }
    },
    removeWheel: (state: ISettingState, action: PayloadAction<number>) => {
      const id = action.payload
      console.log(id)

      if (state.newData.tpms?.wheel_axes) {
        state.newData.tpms.wheel_axes = state.newData.tpms?.wheel_axes.map((axle) => ({
          ...axle,
          wheels: axle.wheels.map((wheel) =>
            id > 0
              ? wheel.filter((item) => item.id !== id)
              : wheel.filter((item) => item.innerWheelId !== id),
          ),
        }))
      } else {
        state.newData.tpms = null
      }
    },
    removeAxle: (state: ISettingState, action: PayloadAction<number>) => {
      const axleId = action.payload
      console.log(axleId)

      if (state.newData.tpms?.wheel_axes) {
        if (axleId > 0) {
          state.newData.tpms.wheel_axes = state.newData.tpms.wheel_axes.filter(
            (axle) => axle.id !== axleId,
          )
        } else {
          state.newData.tpms.wheel_axes = state.newData.tpms.wheel_axes.filter(
            (axle) => axle.innerAxleId !== axleId,
          )
        }
      } else {
        state.newData.tpms = null
      }
    },
    updateSensorNumber: (
      state: ISettingState,
      action: PayloadAction<{ wheelId: number; text: number }>,
    ) => {
      const { wheelId, text } = action.payload
      console.log(`Updating sensor number for wheelId: ${wheelId} with text: ${text}`)

      // Проверка, существует ли массив wheel_axes
      if (state.newData.tpms?.wheel_axes) {
        // Обновление состояния
        state.newData.tpms.wheel_axes = state.newData.tpms.wheel_axes.map((axle) => ({
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
        const item = state.newData.tpms?.wheel_axes?.find((i) => i.id === id)

        // Update the field if the item is found
        if (item) {
          item[field] = value
        }
      } else {
        const item = state.newData.tpms?.wheel_axes?.find((i) => i.innerAxleId === id)

        // Update the field if the item is found
        if (item) {
          item[field] = value
        }
      }
    },
    updateDiagControl: (state: ISettingState, action: PayloadAction<boolean>) => {
      if (state.newData.diag) {
        state.newData.diag.is_enabled = action.payload
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
      const item = state.newData.speed_control
      console.log(value)
      if (item) {
        if (typeof item[field] === "boolean" && valueType === "boolean") {
          item[field] = value
        } else if (typeof item[field] == "number" && valueType == "number") {
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
      const item = state.newData.driver_cards?.driver_events
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
      const item = state.newData.driver_cards?.CustomProtocolMonitoring
      if (item) {
        if (typeof item[field] === "boolean" && valueType === "boolean") {
          item[field] = value
        } else if (typeof item[field] == "number" && valueType == "number") {
          item[field] = value
        }
      }
    },
    updateDriverSettingsEventsRRCRW: (state: ISettingState, action: PayloadAction<number>) => {
      if (state.newData.driver_cards && state.newData.driver_cards.driver_events) {
        state.newData.driver_cards.driver_events.restore_registration_if_card_reapplied_within =
          action.payload
      }
    },
    updateObjectSettingsMain: (
      state: ISettingState,
      action: PayloadAction<IObjectSettingsMain>,
    ) => {
      state.newData.main = action.payload
    },
    updateObjectSettingsCorrectKoef: (
      state: ISettingState,
      action: PayloadAction<PressureNormKoef[]>,
    ) => {
      if (state.newData.tpms != null) {
        state.newData.tpms.settings.wheel_axes.pressure_norm_koef = action.payload
      }
    },
    updateObjectSettingsWheelsPressValidTime: (
      state: ISettingState,
      action: PayloadAction<number>,
    ) => {
      if (state.newData.tpms?.settings.sensors.valid_time_period != null) {
        state.newData.tpms.settings.sensors.valid_time_period = action.payload
      }
    },
    setAccountsList: (
      state: ISettingState,
      action: PayloadAction<IAccounts[] | null | "error" | "loading">,
    ) => {
      state.accounts = action.payload
    },
    setPluginsList: (
      state: ISettingState,
      action: PayloadAction<IPlugins[] | null | "error" | "loading">,
    ) => {
      state.plugins = action.payload
    },
    setObjectSettingsVehicleUid: (state: ISettingState, action: PayloadAction<string>) => {
      state.newData.vehicle_uid = action.payload
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
  updateObjectSettingsMain,
  updateObjectSettingsCorrectKoef,
  updateObjectSettingsWheelsPressValidTime,
  setAccountsList,
  setPluginsList,
  setObjectSettingsVehicleUid,
} = settingsSlice.actions
export default settingsSlice.reducer

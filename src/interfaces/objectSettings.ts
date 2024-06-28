export interface IObjectSettingsData {
  diag: IObjectSettingsDiag
  driver_cards: IDriverSettings
  main: IObjectSettingsMain
  speed_control: ISpeedControlViolation
  tpms: Tpms
}

export interface IObjectSettingsDiag {
  is_enabled: boolean
}

export interface IDriverSettings {
  CustomProtocolMonitoring: CustomProtocolMonitoring
  driver_events: DriverEvents
}

export interface CustomProtocolMonitoring {
  addr: number
  dataSource: number
  func: number
  regNo: number
  use_as_driver_code: boolean
}

export interface DriverEvents {
  end_registration_by_removing_card: boolean
  end_registration_by_turning_off_ignition: boolean
  is_enabled: boolean
  restore_registration_if_card_reapplied_within: number
}

export interface IObjectSettingsMain {
  account_id: number
  is_enabled: boolean
  plugin_id: number
  sim1: string
  sim2: string
  vehicle_id: number
  vehicle_name: string
  vehicle_pwd: string
  vehicle_uid: string
}

export interface ISpeedControlViolation {
  is_enabled: boolean
  max_limit: string
  reg_critical_limit: string
  reg_limit: string
  reg_time_limit: string
  use_road_signs_instead_max_limit: boolean
}

export interface Tpms {
  settings: Settings
  wheel_axes: IWheelAx[]
}

export interface Settings {
  sensors: Sensors
  wheel_axes: WheelAxes
}

export interface Sensors {
  valid_time_period: number
}

export interface WheelAxes {
  pressure_norm_koef: PressureNormKoef[]
}

export interface PressureNormKoef {
  beginning_with: string
  koef: number
}

export interface IWheelAx {
  innerAxleId?: number
  id: number
  pressure_delta: number
  pressure_norm: number
  temperature_max: number
  wheels: IObjectWheel[][]
}

export interface IObjectWheel {
  innerWheelId: number
  innerAxleId: number
  id: number
  position: string
  sensor_number: number
}

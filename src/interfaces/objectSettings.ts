export interface IObjectSettingsData {
  main: IObjectSettingsMain
  diag: IObjectSettingsDiag
  driver_settings: IDriverSettings
  speed_control_violation: ISpeedControlViolation
  wheel_axes: IWheelAx[]
}

export interface IObjectSettingsDiag {
  control: boolean
}

export interface IDriverSettings {
  driver_events: IDriverEvents
  CustomProtocolMonitoring: CustomProtocolMonitoring
}

export interface CustomProtocolMonitoring {
  addr: number
  func: number
  regNo: number
  dataSource: number
  use_as_driver_code: boolean
}

export interface IDriverEvents {
  is_enabled: boolean
  end_registration_by_removing_card: boolean
  end_registration_by_turning_off_ignition: boolean
  restore_registration_if_card_reapplied_within: number
}

export interface IObjectSettingsMain {
  account_id: number
  sim1: string
  sim2: string
  vehicle_id: number
  vehicle_name: string
  vehicle_pwd: string
  vehicle_uid: string
  is_enabled: boolean
  plugin_id: number
}

export interface ISpeedControlViolation {
  max_limit: string
  reg_limit: string
  is_enabled: boolean
  reg_time_limit: string
  reg_critical_limit: string
  use_road_signs_instead_max_limit: boolean
}

export interface IWheelAx {
  id: number
  wheels: Array<IObjectWheel[]>
  pressure_norm: number
  pressure_delta: number
  temperature_max: number
  innerAxleId?: number
}

export interface IObjectWheel {
  id: number
  position: string
  sensor_number: number
  innerWheelId?: number
}

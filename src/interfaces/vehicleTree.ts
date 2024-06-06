export interface ILastDriver {
  driver_code?: number
  driver_name?: string
  driver_start_date?: number
  driver_uid?: string
}

export interface ILastPos {
  alt?: number
  dir?: number
  event_date?: number
  is_ignition_on?: boolean
  lat?: number
  lon?: number
  sats?: number
  speed?: number
}

export interface IVehicle {
  category_name?: string
  last_driver: ILastDriver
  last_pos?: ILastPos
  sim1?: string
  sim2?: string
  vehicle_id: number
  vehicle_name: string
  vehicle_uid: string
}

export interface IVehicleNode extends IVehicle {
  type: "vehicle"
}

export interface IGroupNode {
  account_id: number
  group_name: string
  id: number
  is_root: boolean
  level: number
  parent_id?: number
  role_id: number
  children: (IVehicleNode | IGroupNodeWithType)[]
}

export interface IGroupNodeWithType extends IGroupNode {
  type: "group"
}

export interface IVehiclesRes {
  account_id: number
  group_name: string
  id: number
  is_root: boolean
  level: number
  parent_id?: number
  role_id: number
  vehicles?: IVehicle[]
}

export interface IVehicleRes {
  data: IVehicleData[]
  error_code: number
  error_text: string
}

export interface IVehicleData {
  account_id: number
  group_name: string
  id: number
  is_root: boolean
  level: number
  parent_id?: number
  role_id: number
  vehicles?: IVehicle[]
}

export interface ISwitchHistoryReq {
  vehicle_uid: string // uid машины
  wheel_id: number // id колеса, Если 0 то по всем колесам
  start_date: number // Начальная дата периода
  end_date: number // Конечная дата периода
}
export interface ISwitchHistoryData {
  id: number
  position: string
  reason_replacement: string
  sensor_number: number
  start_date: number
  wheel_id: number
  wheel_model_name: string
}

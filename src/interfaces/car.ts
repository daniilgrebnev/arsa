export interface ICar {
	data: ICarData
	error_code: number
	error_text: string
}

export interface ICarData {
	account_id: number
	category_maket: ICategoryMaket
	category_name: string
	driver: Driver
	pressure_data: IPressureDaum[]
	settings: Settings
	vehicle_id: number
	vehicle_last_event_date: number
	vehicle_name: string
	vehicle_uid: string
}

export interface ICategoryMaket {}

export interface Driver {
	driver_code: number
	driver_name: string | null
	driver_start_date: number
	driver_uid: any
}

export interface IPressureDaum {
	data: Daum[][]
	norm: Norm
}

export interface Daum {
	sensor_data: SensorData
	wheel_model: WheelModel
}

export interface SensorData {
	d: number
	press?: number
	sn: number
	t?: number
	wheel_id: number
}

export interface WheelModel {
	inst_id: any
	name: any
	reason_repl: any
	start_date: any
}

export interface Norm {
	delta: number
	press: number
	t_max: number
	wh_axes_id: number
}

export interface Settings {
	sensors_valid_time_period: number
}
export interface IWidgetInfo {
	wheel_id: number
	last_date: number
	axios_id: number
	pressNorm: number
	delta: number
	maxT: number
	tireModel: string
	tireInstallationDate: number
	tireInstallationText: string
	vehicle_uid?: string
	sn: number
}

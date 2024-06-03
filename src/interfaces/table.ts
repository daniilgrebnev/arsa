export interface ITable {
	data: ITableData[]
	error_code: number
	error_text: string
}

export interface ITableData {
	all_sensors_in_norm: boolean
	axes_count: number
	category_id: number
	category_maket_id: number
	category_name: string
	driver: Driver
	last_event_date: number
	last_pos: LastPos
	sensors_numbers_error: boolean
	sensors_out_of_norm: boolean
	sensors_without_data: boolean
	settings: Settings
	vehicle_id: number
	vehicle_name: string
	vehicle_uid: string
	wheel_model_names: string
	wheel_pressure: WheelPressure[]
}

export interface Driver {
	driver_card_number: any

	driver_code: any
	driver_name: any
	driver_start_date: any
	driver_uid: any
}

export interface LastPos {
	alt: number
	dir: number
	event_date: number
	is_ignition_on: boolean
	lat: number
	lon: number
	sats: number
	speed: number
}

export interface Settings {
	sensors_valid_time_period: number
}

export interface WheelPressure {
	d?: number
	delta?: number
	norm?: number
	press?: number
	sn?: number
	t?: number
	t_max?: number
	wmn?: string
}

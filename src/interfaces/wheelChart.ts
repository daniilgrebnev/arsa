export interface IWheelChart {
	data: IWheelChartData[]
	error_code: number
	error_text: string
	norm: IWheelChartNorm
}

export interface IWheelChartData {
	event_date: number
	pressure: number
	temp: number
}

export interface IWheelChartNorm {
	pressure_delta: number
	pressure_norm: number
	temperature_max: number
	wheel_axes_id: number
}

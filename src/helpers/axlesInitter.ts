interface ISensorData {
  d: number
  press: number
  sn: number
  t: number
  wheel_id: number
}

interface IWheelModel {
  inst_id: number
  name: string
  reason_repl: string
  start_date: number
}

interface INorm {
  delta: number
  press: number
  t_max: number
  wh_axes_id: number
}

export interface IWheel {
  wheel_id: number
  valid_period: number
  data: {
    sensor_data: ISensorData
    wheel_model: IWheelModel
    norm: INorm
  }
}

interface IPressureData {
  data: {
    sensor_data: ISensorData
    wheel_model: IWheelModel
  }[][]
  norm: INorm
}

interface IVehicleData {
  account_id: number
  category_maket: {
    id: number
  }
  category_name: string
  driver: {
    driver_code: any
    driver_name: any
    driver_start_date: any
    driver_uid: any
  }
  pressure_data: IPressureData[]
  settings: {
    sensors_valid_time_period: number
  }
  vehicle_id: number
  vehicle_last_event_date: number
  vehicle_name: string
  vehicle_uid: string
}

export interface IAxles {
  front: IWheel[]
  back: IWheel[][]
}

export function axlesInit(data: any): IAxles {
  const axles: IAxles = {
    front: [],
    back: [],
  }

  if (data && data.pressure_data) {
    const validPeriod = data.settings.sensors_valid_time_period

    const frontAxleData = data.pressure_data[0].data
    if (Array.isArray(frontAxleData) && frontAxleData.length > 0) {
      for (const wheelGroup of frontAxleData) {
        axles.front.push(
          ...wheelGroup.map((wheelData: any) => ({
            wheel_id: wheelData.sensor_data.wheel_id,
            valid_period: validPeriod,
            data: {
              sensor_data: { ...wheelData.sensor_data },
              wheel_model: { ...wheelData.wheel_model },
              norm: { ...data.pressure_data[0].norm },
            },
          }))
        )
      }
    }

    const backAxleData = data.pressure_data.slice(1)
    if (backAxleData.length > 0) {
      axles.back = backAxleData.map((axle) =>
        axle.data.map((wheelGroup: any) =>
          wheelGroup.map((wheelData: any) => ({
            wheel_id: wheelData.sensor_data.wheel_id,
            valid_period: validPeriod,
            data: {
              sensor_data: { ...wheelData.sensor_data },
              wheel_model: { ...wheelData.wheel_model },
              norm: { ...axle.norm },
            },
          }))
        )
      )
    }
  }

  return axles
}

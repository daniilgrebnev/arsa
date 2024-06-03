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

export function getFullVehicleInfo(data: any): IWheel[] {
  const wheels: IWheel[] = []

  if (data && data.pressure_data) {
    data.pressure_data.forEach((pressureDatum: IPressureData) => {
      if (Array.isArray(pressureDatum.data)) {
        pressureDatum.data.forEach((datum: any) => {
          if (Array.isArray(datum)) {
            datum.forEach((wheelData: any) => {
              const wheel: IWheel = {
                wheel_id: wheelData.sensor_data.wheel_id,
                data: {
                  sensor_data: {
                    ...wheelData.sensor_data,
                  },
                  wheel_model: {
                    ...wheelData.wheel_model,
                  },
                  norm: {
                    ...pressureDatum.norm,
                  },
                },
              }
              wheels.push(wheel)
            })
          }
        })
      }
    })
  }

  return wheels
}

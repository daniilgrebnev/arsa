import { IFuelReq } from "@/components/testUi/Fuel/Fuel"
import { ILogPassAuth } from "@/interfaces/auth"
import { ISwitchHistoryReq } from "@/interfaces/switchHistory"
import { ITableData } from "@/interfaces/table"
import { IWheelChart } from "@/interfaces/wheelChart"
import { ISwitchReq } from "@/store/reducers/switchTire/switchTire"
import axios from "axios"
import { IWheel } from "./../interfaces/wheels"

let instance = axios.create({
  baseURL: "https://tpms.arsa.pro/api/",
})

export const createInstance = (token: string) => {
  instance = axios.create({
    baseURL: "https://tpms.arsa.pro/api/",
    headers: { "X-Auth": token, "Content-Type": "application/json" },
  })
}

export const getInfoPointEvent = async (uid: string, start_date: number, end_date: number) => {
  try {
    const res = await instance.post(
      "https://server.arsa.pro/api/svr/v1/reports/tracks/get_events",
      {
        vehicle_uid: uid,
        start_date: start_date,
        end_date: end_date,
        event_ids: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14],
      },
    )
    return res.data
  } catch (e) {
    console.log(e)
    return { error: "Ошибка запроса данных" }
  }
}

// Авторизация
export const authAPI = async (body: ILogPassAuth) => {
  try {
    const response = await instance.post("auth/login", {
      user_login: body.login,
      user_password: body.password,
    })
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, data: null }
    } else {
      return { error: "Ошибка авторизации" }
    }
  }
}

export const codeAuth = async (code: string): Promise<number> => {
  try {
    const res = await instance.post("/auth/confirm", { confirm: code })
    return res.status
  } catch (error) {
    console.error("Error during authentication:", error)
    if (axios.isAxiosError(error) && error.response) {
      // Return the actual HTTP status code from the response
      return error.response.status
    }
    // Return a generic error code if the error is not from an Axios response
    return 500
  }
}

//

export const getTrackAPI = async (uid: string, start_time: any, end_time: any) => {
  try {
    const response = await instance.post(
      "https://server.arsa.pro/api/svr/v1/reports/tracks/get_track",
      {
        vehicle_uid: uid, // uid машины *
        start_date: start_time, // Дата начала периода *
        end_date: end_time, // Дата окончания периода *
        thinning: true, // Прореживать трек
        star_filter: true,
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    return { error: "Ошибка запроса данных" }
  }
}

//Получение Дерева машин
export const getTreeGroupsVehicles = async () => {
  try {
    const { data, status } = await instance.post("tpms/v1/ctl/vehicles/get_tree_vehicles")
    return { data, status }
  } catch (error: any) {
    console.error("Error fetching report:", error)
    const status = error.response ? error.response.status : 500 // Default to 500 if no response
    return { tableData: null, status }
  }
}

export const getTreeDrivers = async () => {
  try {
    const { data, status } = await instance.post("tpms/v1/ctl/drivers/get_tree_drivers")
    return { data, status }
  } catch (error: any) {
    console.error("Error fetching report:", error)
    const status = error.response ? error.response.status : 500 // Default to 500 if no response
    return { tableData: null, status }
  }
}

// Табличные данные
export const getTableData = async (uuids: any) => {
  const body = {
    vehicle_uids: uuids,
    driver_uids: [],
  }

  console.log(body)
  try {
    const response = await instance.post("tpms/v1/reports/get_report_tpms", body)
    const tableData = response.data.data as ITableData
    const status = response.status
    console.log(status)
    return { tableData, status }
  } catch (error: any) {
    console.error("Error fetching report:", error)
    const status = error.response ? error.response.status : 500 // Default to 500 if no response
    return { tableData: null, status }
  }
}

// Данные по машине
export const getCarData = async (id: string) => {
  const body = {
    vehicle_uid: id,
  }
  try {
    const response = await instance.post("tpms/v1/reports/wheels/get_pressure_current_data", body)
    const carData = response.data
    const status = response.status
    return { carData, status }
  } catch (e) {
    return { error: "Ошибка запроса данных" }
  }
}

export interface IWheelChartQueryParams {
  vehicle_uid: string
  start_date: number
  end_date: number
  wheel_axes_id: number
  sensor_number: number
}

// График давления в шине
export const getWheelChartData = async (body: IWheelChartQueryParams) => {
  let wheelChartData: IWheelChart
  let status

  const response = await instance.post("tpms/v1/reports/wheels/get_sensor_data", body, {
    timeout: 120000, // Таймаут в миллисекундах (2 минуты)
  })
  wheelChartData = response.data
  status = response.status
  return { status, wheelChartData }
}

// Справочник шин
export const getCatalogList = async (id) => {
  const body = {
    account_id: id,
  }
  try {
    const response = await instance.post("tpms/v1/ctl/vehicles/wheels/get_wheel_models", body)
    const finalRes = response.data.data
    return finalRes
  } catch (e) {
    return console.error(e)
  }
}

// Создание и обновление шины в справочнике
export const createUpdateWheelModel = async ({ id, comment, name }: IWheel) => {
  const body = {
    id,
    comment,
    name,
  }
  try {
    const response = await instance.post("tpms/v1/ctl/vehicles/wheels/post_wheel_model", body)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

// Удаление модели шин в справочнике
export const deleteWheelModel = async (id: number) => {
  const body = {
    id,
  }
  try {
    const response = await instance.post("tpms/v1/ctl/vehicles/wheels/delete_wheel_model", body)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

// Замена шины на машине
export const setSwitchTire = async (body: ISwitchReq) => {
  try {
    const response = await instance.post("tpms/v1/vehicle/wheels/post_wheel_installation", body)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

// Получить историю замены
export const getSwitchHistory = async (body: ISwitchHistoryReq) => {
  try {
    const response = await instance.post("tpms/v1/vehicles/wheels/get_wheel_installations", body)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

// Удалить историю замены
export const removeSwitchHistory = async (id: number) => {
  try {
    const response = await instance.post("tpms/v1/vehicles/wheels/delete_wheel_installation", {
      id,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

// тест топливо
export const getFuelData = async (body: IFuelReq) => {
  const headers = {
    "X-Auth": localStorage.getItem("X-Auth"),
  }
  try {
    const response = await axios.post(
      "https://server.arsa.pro/server/api/svr/v1/reports/fuel/get_fuel_levels",
      body,
      { headers },
    )
    return { data: response.data, status: response.status }
  } catch {
    return { data: null, status: 500 }
  }
}

// Профиль настроек машины

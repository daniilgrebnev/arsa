import { AppDispatch } from "@/store/store"
import { getTreeGroupsVehicles } from "../../../api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"

import { setVehicleData } from "./vehicleSlice"

export const thunkGetVehicles = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setVehicleData("loading"))
    const { status, data } = await getTreeGroupsVehicles()

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setVehicleData(data))
        break
      case 403:
        dispatch(setVehicleData("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}

import { AppDispatch } from "@/store/store"

import { IFuelReq } from "@/components/testUi/Fuel/Fuel"
import { getFuelData } from "../../../../api/apiGlobal"
import { setIsAuth } from "../../auth/authSlice"
import { setFuelData } from "./fuel"

export const fuelThunk = (body: IFuelReq) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setFuelData("loading"))
    const { status, data } = await getFuelData(body)
    switch (status) {
      case 200:
        dispatch(setFuelData(data))
        break
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Время сессии истекло" }))
        dispatch(setFuelData(null))
        break
      case 403:
        dispatch(setFuelData("error"))
        break
      case 500:
        dispatch(setFuelData(null))
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
        break
    }
  }
}

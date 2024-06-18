import { AppDispatch } from "@/store/store"
import { setIsAuth } from "../auth/authSlice"

import { geoZonesGetTree } from "../../../api/apiGlobal"
import { setGeoZonesData } from "./geozonesSlice"

export const thunkGetGeoZonesTree = () => {
  return async (dispatch: AppDispatch) => {
    const { status, data } = await geoZonesGetTree()
    dispatch(setGeoZonesData("loading"))
    console.log(data.data)
    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))

        break
      case 200:
        dispatch(setGeoZonesData(data))
        break
      case 403:
        dispatch(setGeoZonesData("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}

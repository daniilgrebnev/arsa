import { AppDispatch } from "@/store/store"
import { getObjectSettings } from "src/api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setObjectSettingsData } from "./objectSettings"

export const thunkGetObjectSettings = (vehicle_uid: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setObjectSettingsData({ data: "loading" }))
    const { status, data } = await getObjectSettings(vehicle_uid)

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setObjectSettingsData({ data }))
        break
      case 403:
        dispatch(setObjectSettingsData({ data: "error" }))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}

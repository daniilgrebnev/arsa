import { AppDispatch } from "@/store/store"
import { getTreeDrivers } from "../../../api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setDriversData } from "./driverSlice"

export const thunkGetDriversTree = () => {
  return async (dispatch: AppDispatch) => {
    const { status, data } = await getTreeDrivers()
    dispatch(setDriversData("loading"))
    console.log(data)
    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))

        break
      case 200:
        dispatch(setDriversData(data.data))
        break
      case 403:
        dispatch(setDriversData("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}

import { AppDispatch } from "@/store/store"
import { getCarData } from "../../../api/apiGlobal"
import { getFullVehicleInfo } from "../../../helpers/getfullVehicleInfo"
import { setIsAuth } from "../auth/authSlice"
import { setCarData, setVehicleInfo } from "./car"

export const thunkGetCarData = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCarData("loading"))
    const { carData, status } = await getCarData(uid)
    console.log(status)
    switch (status) {
      case 200:
        const wheelsInfo = getFullVehicleInfo(carData.data)
        dispatch(setCarData(carData))
        dispatch(setVehicleInfo(wheelsInfo))
        break
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Время сессии истекло" }))
        break
      case 403:
        dispatch(setCarData("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
        break
    }
  }
}

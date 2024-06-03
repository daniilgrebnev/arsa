import { AppDispatch } from "@/store/store"
import { IWheelChartQueryParams, getWheelChartData } from "../../../api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setWheelChartData } from "./wheelChart"

export const wheelChartThunk = (body: IWheelChartQueryParams) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setWheelChartData("loading"))
    const { status, wheelChartData } = await getWheelChartData(body)
    switch (status) {
      case 200:
        dispatch(setWheelChartData(wheelChartData))
        break
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Время сессии истекло" }))
        dispatch(setWheelChartData(null))
        break
      case 403:
        dispatch(setWheelChartData("error"))
        break
      case 500:
        dispatch(setWheelChartData(null))
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
        break
    }
  }
}

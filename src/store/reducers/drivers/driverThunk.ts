import { AppDispatch } from "@/store/store"
import { tpmsQuery } from "../../../api/api"
import { setIsAuth } from "../auth/authSlice"
import { setDriversData } from "./driverSlice"

export const thunkGetDriversTree = () => {
  return async (dispatch: AppDispatch) => {
    const { status, data } = await tpmsQuery({ url: "tpms/v1/ctl/drivers/get_tree_drivers" })
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

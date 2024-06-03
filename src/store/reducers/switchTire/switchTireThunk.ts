import { AppDispatch } from "@/store/store"
import { setSwitchTire } from "../../../api/apiGlobal"
import { thunkGetCarData } from "../car/carThunk"
import { ISwitchReq, setOpenSwitch } from "./switchTire"
interface IFullBody {
  body: ISwitchReq
  vehicle_uid: string
}
export const switchTireThunk = (data: IFullBody) => {
  return async (dispatch: AppDispatch) => {
    const res = await setSwitchTire(data.body)
    if (res && res?.data.length != 0) {
      dispatch(setOpenSwitch())
      dispatch(thunkGetCarData(data.vehicle_uid))
    } else {
      console.error("Запрос данных графиков шины оказался неудачным")
    }
  }
}

import { ISwitchHistoryReq } from "@/interfaces/switchHistory"
import { AppDispatch } from "@/store/store"
import { getSwitchHistory, removeSwitchHistory } from "../../../api/apiGlobal"
import { setRemoveSwitchHistory, setSwitchHistoryData } from "./switchTireHistory"

export const getSwitchHistoryThunk = (body: ISwitchHistoryReq) => {
  return async (dispatch: AppDispatch) => {
    const res = await getSwitchHistory(body)
    if (res && res?.data.length != 0) {
      dispatch(setSwitchHistoryData(res.data))
    } else {
      dispatch(setSwitchHistoryData(null))
    }
  }
}

export const removeSwitchHistoryThunk = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const res = await removeSwitchHistory(id)
    if (res && res?.data.length != 0) {
      dispatch(setRemoveSwitchHistory(id))
    } else {
      console.error("Запрос данных графиков шины оказался неудачным")
    }
  }
}

import { AppDispatch } from "@/store/store"
import { createUpdateWheelModel, deleteWheelModel, getCatalogList } from "../../../api/apiGlobal"
import { IWheel } from "./../../../interfaces/wheels"
import { setCatalog } from "./catalog"

export const getCatalogThunk = (id: number) => {
  return async (dispatch: AppDispatch) => {
    const res = await getCatalogList(id)
    if (typeof res != undefined) {
      dispatch(setCatalog(res))
    } else {
      console.error("Неудачный запрос на получение списка справочника резины")
    }
  }
}
export const createUpdateWheelModelThunk = ({ id, name, comment }: IWheel, { account_id }) => {
  return async (dispatch: AppDispatch) => {
    const response = await createUpdateWheelModel({ id, name, comment })
    if (typeof response != undefined) {
      dispatch(getCatalogThunk(account_id))
    } else {
      alert("Ошибка запроса")
    }
  }
}
export const deleteWheelModelThunk = (id: number, account_id: number) => {
  return async (dispatch: AppDispatch) => {
    const response = await deleteWheelModel(id)
    if (typeof response != undefined) {
      dispatch(getCatalogThunk(account_id))
    } else {
      alert("Ошибка запроса")
    }
  }
}

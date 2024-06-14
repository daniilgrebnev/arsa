import { AppDispatch } from "@/store/store"
import { getTableData } from "../../../api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setTableData } from "./table"

export interface IBodyTableQuery {
  vehicle_uids: string[]
  driver_uids: string[]
}

export const thunkGetTableData = (body: IBodyTableQuery) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTableData("loading"))
    const { status, tableData } = await getTableData(body)

    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))
        break
      case 200:
        dispatch(setTableData(tableData))
        break
      case 403:
        dispatch(setTableData("error"))
        break
      case 500:
        dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    }
  }
}

import { AppDispatch } from "@/store/store"
import { getTableData } from "../../../api/apiGlobal"
import { setIsAuth } from "../auth/authSlice"
import { setTableData } from "./table"

export const thunkGetTableData = (body: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTableData("loading"))
    const { status, tableData } = await getTableData(body)
    console.log(status)
    switch (status) {
      case 401:
        dispatch(setIsAuth({ auth: "error", text: "Время сессии истекло" }))
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

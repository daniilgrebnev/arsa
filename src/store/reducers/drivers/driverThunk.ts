import { AppDispatch } from "@/store/store"
import { tpmsQuery } from "../../../api/api"

export const thunkGetDriversTree = () => {
  return async (dispatch: AppDispatch) => {
    // dispatch(setTableData("loading"))
    const { status, data } = await tpmsQuery({ url: "tpms/v1/ctl/drivers/get_tree_drivers" })
    console.log(status)
    console.log(data)
    // switch (status) {
    //   case 401:
    //     // dispatch(setIsAuth({ auth: "error", text: "Сессия завершена" }))

    //     break
    //   case 200:
    //     dispatch(setTableData(tableData))
    //     break
    //   case 403:
    //     dispatch(setTableData("error"))
    //     break
    //   case 500:
    //     dispatch(setIsAuth({ auth: "error", text: "Ошибка сервера" }))
    // }
  }
}

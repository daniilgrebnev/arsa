// import { AppDispatch } from "@/store/store"
// import { tpmsQuery } from "../../../api/api"
// import { setDriversData } from "./driverSlice"

// export const thunkGetDriversTree = () => {
//   return async (dispatch: AppDispatch) => {
//     // dispatch(setTableData("loading"))
//     const { status, data } = await tpmsQuery({ url: "tpms/v1/ctl/drivers/get_tree_drivers" })
//     dispatch(setDriversData("loading"))
//     console.log(data)
//     switch (status) {
//       case 401:
//         dispatch(setDriversData({ auth: "error", text: "Сессия завершена" }))

//         break
//       case 200:
//         dispatch(setDriversData(data.data))
//         break
//       case 403:
//         dispatch(setDriversData("error"))
//         break
//       case 500:
//         dispatch(setDriversData({ auth: "error", text: "Ошибка сервера" }))
//     }
//   }
// }

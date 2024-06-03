import { IGroupGeozone } from "@/interfaces/geozone"
import { getTreeGroupsVehicles } from "../../../api/apiGlobal"
import { IVehicleGroup } from "./../../../interfaces/vehicle"
import { AppDispatch } from "./../../store"
import { setGroupsGeozone, setGroupsVehicle } from "./security"

// export const thunkAuth = (login: string, password: string) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(setIsAuth("loading"))
//     const res:IAuthRes = await authAPI(login, password)
//     if ("jwt" in res) {
//       const token = res.jwt as string
//       createInstance(token)
//       if(res.waiting_confirm == true){
//         dispatch(setOpenCodeWidget(true))
//       }
//       dispatch(setIsAuth(true))
//     }

//   }
// }

export const thunkGetVehicle = () => {
  return async (dispatch: AppDispatch) => {
    const res: any = await getTreeGroupsVehicles()
    if ("rows" in res) {
      let newGroups: IVehicleGroup[] = res.rows.map((group) => {
        return { ...group, status: "none" }
      })

      dispatch(setGroupsVehicle(newGroups))
    }
  }
}

export const thunkGetGeozone = () => {
  return async (dispatch: AppDispatch) => {
    const res: any = await getTreeGroupsVehicles()
    if ("rows" in res) {
      let newGroups: IGroupGeozone[] = res.rows.map((group) => {
        return { ...group, status: "none" }
      })

      dispatch(setGroupsGeozone(newGroups))
    }
  }
}

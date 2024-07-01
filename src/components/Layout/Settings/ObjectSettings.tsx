import { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunkGetObjectSettings } from "src/store/reducers/objectSettings/objectSettingsThunk"
import {
  setObjectSettingsVehicleUid,
  setOpenSettings,
} from "../../../store/reducers/objectSettings/objectSettings"
import { ObjectSettingsContent } from "./Content/ObjectSettingsContent"
import { ObjectSettingsNavbar } from "./Navbar/ObjectSettingsNavbar"

export const ObjectSettings = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const { data } = useSelector((state: RootState) => state.objectSettings)

  useEffect(() => {
    dispatch(thunkGetObjectSettings("08aba997-99d8-5b5d-c060-d8595c0aec6c"))
    dispatch(setObjectSettingsVehicleUid("08aba997-99d8-5b5d-c060-d8595c0aec6c"))
  }, [])

  // console.log(data)
  return (
    <div className="z-[2000] absolute top-0 left-0 flex items-center justify-center  w-screen h-screen backdrop-blur-sm">
      <div className="w-[95%] h-[100%] bg-gray-100 rounded-sm p-2 relative">
        <h1 className="text-center text-6xl my-5 font-light">Настройки</h1>
        <div
          onClick={() => dispatch(setOpenSettings(false))}
          className="absolute right-0 top-0 p-10 icon-cross cursor-pointer text-red-500 text-2xl font-bold"
        ></div>
        <div className="flex items-start h-[70dvh] overflow-hidden justify-start">
          <ObjectSettingsNavbar />
          <ObjectSettingsContent />
        </div>
      </div>
    </div>
  )
}

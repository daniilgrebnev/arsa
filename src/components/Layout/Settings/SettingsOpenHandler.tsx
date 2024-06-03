import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import { setOpenSettings } from "../../../store/reducers/objectSettings/objectSettings"
import { ObjectSettingsIcons } from "./icons/ObjectSettingsIcons"

export const SettingsOpenHandler = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div
      onClick={() => dispatch(setOpenSettings(true))}
      className=" text-3xl text-orange-400 fill-[#FF6900] transition-all cursor-pointer hover:opacity-75 active:fill-orange-600"
    >
      <ObjectSettingsIcons fill="0" width={30} />
    </div>
  )
}

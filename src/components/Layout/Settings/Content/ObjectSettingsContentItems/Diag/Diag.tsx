import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { updateDiagControl } from "src/store/reducers/objectSettings/objectSettings"
import { ObjectSettingsItem } from "../ObjectSettingsItem"

export const Diag: React.FC<any> = (diag) => {
  const data = useSelector((state: RootState) => state.objectSettings.newData.diag)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="h-[90%]">
      <h1 className="text-center text-3xl mb-5 font-light">{diag.title}</h1>
      <div className="w-full h-1/3 flex items-center justify-center">
        <div className="grid grid-cols-2 px-52 gap-y-5 gap-x-32 w-full justify-center items-center">
          <ObjectSettingsItem
            title={"Контроль"}
            value={data?.is_enabled}
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              dispatch(updateDiagControl(target.checked))
            }}
            type={"checkbox"}
          />
        </div>
      </div>
    </div>
  )
}

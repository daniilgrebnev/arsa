import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { thunkSaveSettingsObject } from "src/store/reducers/objectSettings/objectSettingsThunk"

export const SaveObjectSettings = () => {
  const dispatch = useDispatch<AppDispatch>()
  const body = useSelector((state: RootState) => state.objectSettings.newData)

  const saveHandler = () => {
    dispatch(thunkSaveSettingsObject(body))
  }

  return (
    <div className="absolute bottom-24 left-14 w-full  text-white text-xl" onClick={saveHandler}>
      <div className="w-1/6 bg-orange-500 mx-auto px-10 py-6 text-3xl flex items-center justify-center">
        Сохранить
      </div>
    </div>
  )
}

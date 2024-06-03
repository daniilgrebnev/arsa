import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOpenSwitchChange } from "../../../../store/reducers/switchTire/switchTire"

export const SwitchTireList = () => {
  const { tire, switchHistoryTire } = useSelector((state: RootState) => state.switchTire)

  const [tireName, setTireName] = useState("")

  useEffect(() => {
    setTireName((tire.length > 0 && tire) || switchHistoryTire?.tireName || "")
  }, [tire])

  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="w-full flex items-center justify-center mt-5 font-light">
      <div className="">
        <h1 className="text-lg font-light text-center ">Новая шина</h1>
        <div className="bg-white rounded-lg overflow-hidden text-black flex items-center justify-end gap-3">
          <div className="px-3 py-1 text-nowrap text-ellipsis">
            {tireName.length == 0 ? <>Ничего не выбрано</> : <>{tireName}</>}
          </div>

          <div
            onClick={() => dispatch(setOpenSwitchChange())}
            className="bg-orange-600 text-white font-normal hover:bg-orange-700 active:bg-orange-800 transition-all cursor-pointer px-3 py-1"
          >
            Выбрать
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}

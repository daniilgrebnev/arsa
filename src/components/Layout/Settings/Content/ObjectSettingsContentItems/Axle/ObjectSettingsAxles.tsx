import { IWheelAx } from "@/interfaces/objectSettings"
import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAxle } from "src/store/reducers/objectSettings/objectSettings"
import { Axle } from "./innerComponents/Axle"
import { CorrectValue } from "./innerComponents/CorrectValue"
import { Plus } from "./innerComponents/icons/Plus"

export const ObjectSettingsAxles: React.FC<any> = (axes, onChange: (e: any) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const wheel_axes = useSelector(
    (state: RootState) => state.objectSettings.newData.tpms?.wheel_axes,
  )
  const [data, setData] = useState<IWheelAx[]>()
  const axlesData: IWheelAx[] = axes.data
  useEffect(() => {
    setData(axlesData)
  }, [wheel_axes])

  const addAxle = () => {
    dispatch(createAxle())
  }
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-3xl mb-5 font-light">{axes.title}</h1>
      <div className="">
        <div className="flex font-light items-center justify-center w-full gap-3 text-center px-12">
          <div className="text-center w-1/2 text-lg">Оси</div>
          <div className="grid grid-cols-3 text-lg w-1/2">
            <div className="">Макс. давление</div>
            <div className="">Допустимое отклонение</div>
            <div className="">Макс. температура</div>
          </div>
        </div>
        {wheel_axes?.map((item, index) => (
          <div key={index}>
            <Axle data={item} />
          </div>
        ))}
        <div
          onClick={addAxle}
          className=" cursor-pointer flex items-center  justify-center select-none  w-1/2   "
        >
          <div className="w-fit bg-slate-100 hover:bg-slate-200 active:bg-slate-300 p-2 gap-2 flex items-center justify-center rounded">
            <Plus fill="black" width={20} />
            <p>Добавить ось</p>
          </div>
        </div>
      </div>
      <CorrectValue />
    </div>
  )
}

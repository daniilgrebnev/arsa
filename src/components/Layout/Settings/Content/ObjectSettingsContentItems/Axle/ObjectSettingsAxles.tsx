import { IWheelAx } from "@/interfaces/objectSettings"
import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAxle } from "src/store/reducers/objectSettings/objectSettings"
import { Axle } from "./innerComponents/Axle"
import { Plus } from "./innerComponents/icons/Plus"

export const ObjectSettingsAxles: React.FC<any> = (axes, onChange: (e: any) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const { wheel_axes } = useSelector((state: RootState) => state.objectSettings.newData)
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
        {wheel_axes?.map((item, index) => (
          <div key={index}>
            <Axle data={item} />
          </div>
        ))}
        <div
          onClick={addAxle}
          className=" flex items-center justify-center select-none gap-2 p-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 w-fit  rounded cursor-pointer"
        >
          <Plus fill="black" width={20} />
          <p>Добавить ось</p>
        </div>
      </div>
    </div>
  )
}

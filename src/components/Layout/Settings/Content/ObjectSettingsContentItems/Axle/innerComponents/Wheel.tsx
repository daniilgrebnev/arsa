import { IObjectWheel } from "@/interfaces/objectSettings"
import { AppDispatch } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  removeWheel,
  updateSensorNumber,
} from "../../../../../../../store/reducers/objectSettings/objectSettings"

interface IObjectSettingsWheel {
  data: IObjectWheel
}

export const Wheel: React.FC<IObjectSettingsWheel> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [dataArr, setData] = useState<IObjectWheel>()
  const [isOpenRemover, setOpenRemover] = useState(false)

  useEffect(() => {
    setData(data)
  }, [data])
  console.log(data)

  const setSensorNumber = (text: string) => {
    const num = Number(text)
    if (num >= 0) {
      dispatch(
        updateSensorNumber({
          wheelId: data ? (data.innerWheelId ? data.innerWheelId : data.id) : 0,
          text: num,
        }),
      )
    }
  }

  return (
    <div
      onMouseEnter={() => setOpenRemover(true)}
      onMouseLeave={() => setOpenRemover(false)}
      className="w-14 h-20 my-4  rounded border border-orange-500 flex items-center relative justify-center"
    >
      {isOpenRemover && (
        <div
          onMouseUp={() =>
            dispatch(
              removeWheel(
                dataArr ? (dataArr.innerWheelId ? dataArr?.innerWheelId : dataArr?.id) : 0,
              ),
            )
          }
          className="icon-delete p-1 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded absolute bg-white -right-3 -top-3 text-red-500"
        ></div>
      )}

      <textarea
        onChange={(e) => setSensorNumber(e.target.value)}
        rows={1}
        className="bg-transparent text-center resize-none text-xl font-light"
        value={dataArr?.sensor_number}
      ></textarea>
    </div>
  )
}

import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import { IWheelAx } from "src/interfaces/objectSettings"
import { updateNorms } from "src/store/reducers/objectSettings/objectSettings"

export const AxleNorms: React.FC<IWheelAx> = ({
  pressure_norm,
  pressure_delta,
  temperature_max,
  id,
}) => {
  interface IDataNorm {
    name: string
    field: "pressure_norm" | "pressure_delta" | "temperature_max"
    value: number
  }
  const data: IDataNorm[] = [
    {
      field: "pressure_norm",
      name: "Макс. давление",
      value: pressure_norm,
    },
    {
      field: "pressure_delta",
      name: "Допустимое отклонение",
      value: pressure_delta,
    },
    {
      field: "temperature_max",
      name: "Макс. температура",
      value: temperature_max,
    },
  ]
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="w-full">
          <input
            className="w-full bg-transparent p-3 border rounded focus-within:border-orange-500"
            onChange={(e) =>
              dispatch(
                updateNorms({
                  field: item.field,
                  id: id,
                  value: Number(e.target.value),
                }),
              )
            }
            value={item.value}
            type="text"
          />
        </div>
      ))}
    </>
  )
}

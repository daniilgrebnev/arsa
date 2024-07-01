import { AppDispatch } from "@/store/store"
import React from "react"
import { useDispatch } from "react-redux"
import { IWheelAx } from "src/interfaces/objectSettings"
import { updateNorms } from "src/store/reducers/objectSettings/objectSettings"

export interface IDataNorm {
  name: string
  field: "pressure_norm" | "pressure_delta" | "temperature_max"
  value: number
}

export const AxleNorms: React.FC<IWheelAx> = ({
  pressure_norm,
  pressure_delta,
  temperature_max,
  id,
}) => {
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

  const handleChange = (field: IDataNorm["field"], e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Remove leading zeros
    if (value.length > 1 && value[0] === "0") {
      value = value.slice(1)
    }

    // Ensure the value is a valid number
    const numericValue = isNaN(Number(value)) ? 0 : Number(value)

    dispatch(
      updateNorms({
        field: field,
        id: id,
        value: numericValue,
      }),
    )
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="w-full">
          <input
            className="w-full bg-transparent p-3 border rounded focus-within:border-orange-500"
            onChange={(e) => handleChange(item.field, e)}
            value={item.value}
            type="text"
            placeholder="кПа"
          />
        </div>
      ))}
    </>
  )
}

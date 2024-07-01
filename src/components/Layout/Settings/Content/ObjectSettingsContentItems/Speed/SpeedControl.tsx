import { AppDispatch, RootState } from "@/store/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSpeedViolationData } from "src/store/reducers/objectSettings/objectSettings"
import { ObjectSettingsItem } from "../ObjectSettingsItem"

export const SpeedControl: React.FC<any> = (speedData) => {
  interface ISpeedControlData {
    field:
      | "max_limit"
      | "reg_limit"
      | "is_enabled"
      | "reg_time_limit"
      | "reg_critical_limit"
      | "use_road_signs_instead_max_limit"
    value: number | string | boolean
    name: string
  }
  const dispatch = useDispatch<AppDispatch>()
  const scv = useSelector((state: RootState) => state.objectSettings.newData.speed_control)
  const data: ISpeedControlData[] = [
    {
      name: "Максимальная разрешенная скорость",
      field: "max_limit",
      value: scv?.max_limit != undefined && scv.max_limit,
    },
    {
      name: "Лимит регистрации нарушения скорости",
      field: "reg_limit",
      value: scv?.reg_limit != undefined && scv.reg_limit,
    },
    {
      name: "Состояние регистрации",
      field: "is_enabled",
      value: scv?.is_enabled != undefined && scv.is_enabled,
    },
    {
      name: "Лимит времени на регистрацию нарушения (сек)",
      field: "reg_time_limit",
      value: scv?.reg_time_limit != undefined && scv.reg_time_limit,
    },
    {
      name: "Лимит регистрации нарушения критической скорости",
      field: "reg_critical_limit",
      value: scv?.reg_critical_limit != undefined && scv.reg_critical_limit,
    },
    {
      name: "Использовать дорожные знаки вместо max_limit",
      field: "use_road_signs_instead_max_limit",
      value:
        scv?.use_road_signs_instead_max_limit != undefined && scv.use_road_signs_instead_max_limit,
    },
  ]
  const handleChange = (field: string, target) => {
    let currentValue = typeof target.value == "boolean" ? target.checked : target.value

    // Remove leading zeros
    if (
      currentValue !== undefined &&
      currentValue != 0 &&
      currentValue.length > 1 &&
      currentValue[0] === "0"
    ) {
      currentValue = currentValue.slice(1)
    }

    // Ensure the value is a valid number
    const numericValue: any = isNaN(Number(currentValue)) ? target.checked : Number(currentValue)

    dispatch(
      updateSpeedViolationData({
        field: field,
        value: typeof target.value === "boolean" ? target.checked : numericValue,
      }),
    )
  }
  return (
    <div>
      <h1 className="text-center text-3xl mb-10 font-light">{speedData.title}</h1>
      <div className="grid grid-cols-2 px-52 gap-y-5 gap-x-32 w-full justify-center items-center">
        {data.map((item, index) => (
          <ObjectSettingsItem
            title={item.name}
            value={item.value != undefined ? item.value : 0}
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              handleChange(item.field, target)
            }}
            type={typeof item.value === "boolean" ? "checkbox" : "text"}
          />
        ))}
      </div>
    </div>
  )
}

import { AppDispatch, RootState } from "@/store/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  updateDriverSettingsEvents,
  updateDriverSettingsEventsRRCRW,
} from "src/store/reducers/objectSettings/objectSettings"
import { DateTime } from "ts-luxon"
import { ObjectSettingsItem } from "../../ObjectSettingsItem"
function extractNumbersAndCommas(text) {
  // Извлекаем все цифры и запятые
  const extracted = text.match(/[\d,]+/g)

  // Если ничего не найдено, возвращаем null
  if (!extracted) {
    return null
  }

  // Объединяем найденные части и заменяем запятые на точки
  const result = extracted.join("").replace(/,/g, ".")

  // Преобразуем в число и возвращаем
  return Number(result)
}
interface IDataDE {
  name: string
  field:
    | "is_enabled"
    | "end_registration_by_removing_card"
    | "end_registration_by_turning_off_ignition"
    | "restore_registration_if_card_reapplied_within"
  value: number | boolean
}
interface IChangeProps {
  field: string
  value: boolean | string
}

export const DriverEvents: React.FC = () => {
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const data = useSelector(
    (state: RootState) => state.objectSettings.newData.driver_cards?.driver_events,
  )
  useEffect(() => {
    const timeMin = DateTime.fromSeconds(
      Number(data?.restore_registration_if_card_reapplied_within),
    ).minute
    const timeSeconds = DateTime.fromSeconds(
      Number(data?.restore_registration_if_card_reapplied_within),
    ).second
    setMin(timeMin)
    setSec(timeSeconds)
  }, [])
  const dispatch = useDispatch<AppDispatch>()
  const dataDE: IDataDE[] = [
    {
      name: "Регистрация водителя прикладыванием метки",
      field: "is_enabled",
      value: data?.is_enabled != undefined && data.is_enabled,
    },
    {
      name: "Завершать регистрацию выниманием метки из держателя",
      field: "end_registration_by_removing_card",
      value:
        data?.end_registration_by_removing_card != undefined &&
        data.end_registration_by_removing_card,
    },
    {
      name: "Завершать регистрацию выключением зажигания ",
      field: "end_registration_by_turning_off_ignition",
      value:
        data?.end_registration_by_turning_off_ignition != undefined &&
        data.end_registration_by_turning_off_ignition,
    },
    {
      name: "Восстанавливать регистрацию если метка приложена (МИН,СЕК) ",
      field: "restore_registration_if_card_reapplied_within",
      value:
        data?.restore_registration_if_card_reapplied_within != undefined &&
        data.restore_registration_if_card_reapplied_within,
    },
  ]

  const changeHandler = ({ value, field }: IChangeProps) => {
    console.log(value)

    dispatch(
      updateDriverSettingsEvents({
        field,
        value: value,
      }),
    )
  }

  const changeSec = (number: number) => {
    if (number >= 0 && number <= 59) {
      setSec(number)
      const nowTime = min * 60 + sec
      dispatch(updateDriverSettingsEventsRRCRW(nowTime))
    }
  }
  const changeMin = (number: number) => {
    if (number >= 0 && number <= 59) {
      setMin(number)
      const nowTime = min * 60 + sec
      dispatch(updateDriverSettingsEventsRRCRW(nowTime))
    }
  }

  return (
    <div>
      <h2 className="text-center text-xl mb-10 font-light">События</h2>
      <div className="grid grid-cols-2 px-52 gap-y-5 gap-x-32 w-full justify-center items-center">
        {dataDE.map(
          (item, index) =>
            item.field != "restore_registration_if_card_reapplied_within" && (
              <ObjectSettingsItem
                title={item.name}
                value={item.value}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement
                  dispatch(
                    updateDriverSettingsEvents({
                      value: target.checked,
                      field: item.field,
                    }),
                  )
                }}
                type={typeof item.value == "boolean" ? "checkbox" : "text"}
              />
            ),
        )}
        <div className="text-xl font-light">
          Восстанавливать регистрацию если метка приложена (МИН,СЕК)
        </div>
        <div className="flex items-center justify-start gap-3">
          <input
            onChange={(e) => changeMin(Number(e.target.value))}
            type="number"
            value={min}
            min={0}
            max={59}
            className="w-14 h-7 rounded bg-transparent border focus-within:border-orange-500 flex items-center justify-center text-center  aspect-square"
          />
          <p>мин.</p>
          <input
            onChange={(e) => changeSec(Number(e.target.value))}
            type="number"
            value={sec}
            min={0}
            max={59}
            className="w-14 h-7 rounded bg-transparent border focus-within:border-orange-500 flex items-center justify-center text-center  aspect-square"
          />
          <p>сек.</p>
        </div>
      </div>
    </div>
  )
}

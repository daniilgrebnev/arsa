import { PressureNormKoef } from "@/interfaces/objectSettings"
import { AppDispatch, RootState } from "@/store/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateObjectSettingsCorrectKoef } from "src/store/reducers/objectSettings/objectSettings"

export const CorrectValue = () => {
  const initialData =
    useSelector(
      (state: RootState) =>
        state.objectSettings.newData.tpms?.settings.wheel_axes.pressure_norm_koef,
    ) || []

  const [data, setData] = useState<PressureNormKoef[]>([...initialData])

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(updateObjectSettingsCorrectKoef(data))
  }, [data])

  const setNewBegDate = (date: string, index: number) => {
    const newData = data.map((item, i) => (i === index ? { ...item, beginning_with: date } : item))
    setData(newData)
  }

  const setNewKoef = (koef: number, index: number) => {
    const newData = data.map((item, i) => (i === index ? { ...item, koef: koef } : item))
    setData(newData)
  }

  return (
    <div className="w-full">
      <h1 className="text-center text-3xl mb-5 font-light">Значения корректировки</h1>
      <div className="grid grid-cols-2 grid-rows-3 text-center mx-auto w-1/3 rounded border overflow-hidden">
        <div className="border p-4">Дата</div>
        <div className="border p-4">Коэфф.</div>
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            <div className="border p-4 flex items-center justify-center w-full h-full">
              <textarea
                onChange={(e) => setNewBegDate(e.target.value, index)}
                value={item.beginning_with}
                className="resize-none text-center w-full bg-transparent"
              ></textarea>
            </div>
            <div className="border p-4 flex items-center justify-center w-full h-full">
              <textarea
                onChange={(e) => setNewKoef(Number(e.target.value), index)}
                value={item.koef}
                className="resize-none text-center w-full bg-transparent"
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { updateObjectSettingsWheelsPressValidTime } from "src/store/reducers/objectSettings/objectSettings"

export const ValidTime = () => {
  const time = useSelector(
    (state: RootState) => state.objectSettings.newData.tpms?.settings.sensors.valid_time_period,
  )
  const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {}, [time])

  const valueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value

    // Remove leading zeros
    if (value.length > 1 && value[0] === "0") {
      value = value.slice(1)
    }

    // Ensure the value is a valid number
    const numericValue = isNaN(Number(value)) ? 0 : Number(value)
    console.log(numericValue)
    dispatch(updateObjectSettingsWheelsPressValidTime(numericValue))
  }
  return (
    <div className=" flex items-center justify-end gap-6">
      <p>Актуально в течение</p>
      <textarea
        rows={1}
        cols={4}
        value={time}
        className="w-fit border p-2 rounded px-6 resize-none text-center text- font-light flex items-center justify-center"
        placeholder="кПа"
        onChange={(e) => valueHandler(e)}
      />
      сек
    </div>
  )
}

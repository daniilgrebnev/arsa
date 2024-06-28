import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export const ValidTime = () => {
  const time = useSelector(
    (state: RootState) => state.objectSettings.newData.tpms?.settings.sensors.valid_time_period,
  )
  return (
    <div className=" flex items-center justify-end gap-6">
      <p>Актуально в течение</p>
      {time}сек
    </div>
  )
}

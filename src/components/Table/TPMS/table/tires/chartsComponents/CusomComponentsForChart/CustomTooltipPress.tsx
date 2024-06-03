import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { DateTime } from "ts-luxon"

export const CustomTooltipPress = ({ active, payload, label }: any) => {
  const data = useSelector((state: RootState) => state.wheelChart.data)
  const norm = typeof data != "string" && data?.norm
  const minNorm = (norm && norm.pressure_norm - norm?.pressure_delta) || 0
  const maxNorm = (norm && norm.pressure_norm + norm.pressure_delta) || 0

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div>
          {payload.map((pld) => (
            <div
              style={{
                background: pld.value > minNorm && pld.value < maxNorm ? "#bdf0b3c3" : "#fda7a7c3",
              }}
              className="bg-white px-5 py-2 rounded-lg "
            >
              <div>Давление: {pld.value} кПа</div>
              <div>Время: {DateTime.fromSeconds(label).toLocaleString(DateTime.TIME_SIMPLE)}</div>
              <div className="">
                Дата: {DateTime.fromSeconds(label).toLocaleString(DateTime.DATE_SHORT)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { DateTime } from "ts-luxon"

export const ChangedInfo = () => {
  const activeWheelChartData = useSelector((state: RootState) => state.wheelChart.activeData)
  const { wheel_id, vehicle_wheel_info } = useSelector((state: RootState) => state.car)
  const wheel = vehicle_wheel_info?.filter((item) => item.wheel_id === wheel_id)[0]
  const delta = wheel?.data.norm.delta
  const normPress = wheel?.data.norm.press
  const maxT = wheel?.data.norm.t_max
  const press = activeWheelChartData ? activeWheelChartData.pressure : null
  const temp = maxT && activeWheelChartData ? activeWheelChartData.temp < maxT : false
  const pressISNorm =
    press && normPress && delta && press > press - normPress && press < delta + normPress
  const pressIconColor =
    activeWheelChartData == null ? "text-black" : pressISNorm ? "text-green-600" : "text-red-400"
  const tempIconColor =
    activeWheelChartData == null ? "text-black" : temp ? "text-green-600" : "text-red-400"
  return (
    <>
      <div className="w-full bg-gray-300 flex h-[11%] items-center justify-center gap-10 py-1 px-3 transition-all">
        <div
          style={{
            msTextOverflow: "ellipsis",
          }}
          className="flex items-center justify-center gap-2 text-nowrap  text-ellipsis"
        >
          <span className={`icon-temp text-[150%]  ${tempIconColor}`}></span>
          <p>{activeWheelChartData && activeWheelChartData.temp} ºC</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-nowrap  text-ellipsis">
          <span className={`icon-press text-[150%] ${pressIconColor}`}></span>
          <p>{activeWheelChartData && activeWheelChartData.pressure} кПа</p>
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <span className="icon-calendar text-[150%] text-orange-500"></span>
          <p>
            <span>
              {activeWheelChartData && activeWheelChartData?.event_date > 0 && (
                <>
                  {DateTime.fromSeconds(
                    (activeWheelChartData && activeWheelChartData?.event_date) || 0
                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                </>
              )}
            </span>
            <span> </span>
            <span>
              {activeWheelChartData && activeWheelChartData?.event_date > 0 && (
                <>
                  {DateTime.fromSeconds(
                    (activeWheelChartData && activeWheelChartData?.event_date) || 0
                  ).toLocaleString(DateTime.DATE_SHORT)}
                </>
              )}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

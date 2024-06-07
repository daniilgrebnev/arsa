import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { IWheel } from "../../../../../../helpers/axlesInitter"
import { setWheelId } from "../../../../../../store/reducers/car/car"
import {
  setChartsQueryBody,
  setDomain,
  setOpenCharts,
} from "../../../../../../store/reducers/wheelChart/wheelChart"
import { wheelChartThunk } from "../../../../../../store/reducers/wheelChart/wheelChartThunk"
import { colorInit } from "../../CircleIndicator"

export const Wheel: React.FC<IWheel> = (wheel) => {
  const dispatch = useDispatch<AppDispatch>()

  const { vehicle_uid } = useSelector((state: RootState) => state.car)
  const { isOpen } = useSelector((state: RootState) => state.wheelChart)
  const isActiveWheel: boolean =
    useSelector((state: RootState) => state.car.wheel_id) === wheel.wheel_id
  const start_date: number = useSelector((state: RootState) => state.security.startTiming)
  const end_date: number = useSelector((state: RootState) => state.security.endTiming)

  const body = {
    press: wheel.data.sensor_data.press,
    norm: wheel.data.norm.press,
    d: wheel.data.sensor_data.d,
    valid_period: wheel.valid_period,
    delta: wheel.data.norm.delta,
  }
  const color = colorInit(body).color

  const bodyForChartsQuery = {
    vehicle_uid,
    wheel_axes_id: wheel.data.norm.wh_axes_id,
    sensor_number: wheel.data.sensor_data.sn,
    end_date,
    start_date,
  }

  const clickHandler = (id) => {
    dispatch(setDomain({ min: "dataMin + 10%", max: "dataMax + 10%" }))
    dispatch(setOpenCharts(true))
    dispatch(setWheelId(id))

    dispatch(wheelChartThunk(bodyForChartsQuery))
    dispatch(setChartsQueryBody(bodyForChartsQuery))
  }

  return (
    <div
      onClick={() => clickHandler(wheel.wheel_id)}
      className={`${color} ${
        isActiveWheel && "border-2 border-black bg-opacity-75 "
      } relative font-light transition-all flex cursor-pointer hover:bottom-1 bottom-0 active:bg-opacity-85 items-center justify-center text-xs  w-9 h-14 rounded-lg text-white `}
    >
      <div className="">
        {wheel.data.sensor_data.press !== null && wheel.data.sensor_data.t !== null ? (
          <>
            <div>{wheel.data.sensor_data.t >= 0 ? wheel.data.sensor_data.t : "н/д"}</div>
            <div>{wheel.data.sensor_data.press >= 0 ? wheel.data.sensor_data.press : "н/д"}</div>
          </>
        ) : (
          <>Н/Д</>
        )}
      </div>
    </div>
  )
}

import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { Skeleton } from "../../../../../components/Loading/Skeleton"
import { NullableDate } from "../../../../../components/NullableDate/NullableDate"
import { IQueryChartData, setDomain } from "../../../../../store/reducers/wheelChart/wheelChart"
import { wheelChartThunk } from "../../../../../store/reducers/wheelChart/wheelChartThunk"
import { ChangedInfo } from "./chartsComponents/ChangedInfo"
import { PressChart } from "./chartsComponents/PressChart"
import { TempChart } from "./chartsComponents/TempChart"

interface IQueryFullData extends IQueryChartData {
  start_date: number
  end_date: number
}

export const Charts = () => {
  const [isMax, setIsMax] = useState(false)
  const [isMin, setIsMin] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const zoomOut = () => {
    setIsMax(false)
    setIsMin(false)
    dispatch(
      setDomain({
        min: "dataMin + 10%",
        max: "dataMax + 10%",
      }),
    )
  }
  const { wheel_id, vehicle_wheel_info } = useSelector((state: RootState) => state.car)
  const last_event_date = vehicle_wheel_info?.find((item) => item.wheel_id == wheel_id)?.data
    .sensor_data.d

  const { data, queryData, domain } = useSelector((state: RootState) => state.wheelChart)
  const { startTiming, endTiming } = useSelector((state: RootState) => state.security)
  const falseDate = last_event_date && last_event_date < endTiming
  const dataIsNoEmpty = typeof data != "string"
  const queryFullData: IQueryFullData = {
    vehicle_uid: queryData ? queryData?.vehicle_uid : "",
    wheel_axes_id: queryData ? queryData?.wheel_axes_id : 0,
    sensor_number: queryData ? queryData?.sensor_number : 0,
    end_date: Math.round(endTiming),
    start_date: Math.round(startTiming),
  }

  useEffect(() => {
    queryData && dispatch(wheelChartThunk(queryFullData))
  }, [startTiming, endTiming])

  const leftHandler = () => {
    setIsMax(false)
    if (typeof domain.min != "string" && typeof domain.max != "string") {
      const newMax = domain.max - 3600
      const newMin = domain.min - 3600
      const zoomDelta = newMax - newMin
      const startDate = Math.round(startTiming)
      if (newMin < startDate) {
        setIsMin(true)
        dispatch(
          setDomain({
            min: startDate,
            max: startDate + zoomDelta,
          }),
        )
      } else {
        dispatch(
          setDomain({
            min: domain.min - 3600,
            max: domain.max - 3600,
          }),
        )
      }
    }
  }
  const rightHandler = () => {
    setIsMin(false)
    if (typeof domain.min != "string" && typeof domain.max != "string") {
      const newMax = domain.max + 3600
      const newMin = domain.min + 3600
      const zoomDelta = newMax - newMin
      const endDate = Math.round(endTiming)
      if (newMax > endDate) {
        setIsMax(true)
        dispatch(
          setDomain({
            min: endDate - zoomDelta,
            max: endDate,
          }),
        )
      } else {
        dispatch(
          setDomain({
            min: domain.min + 3600,
            max: domain.max + 3600,
          }),
        )
      }
    }
  }
  return (
    <>
      <div className="w-full h-full bg-gray-200 relative ">
        {data == null && <NullableDate color="#9f8204" text="Шина не выбрана" />}
        {typeof data !== "string" && data && Object.keys(data.data).length === 0 && (
          <div className="flex absolute  left-0 top-0 flex-col items-end justify-center  bg-transparent w-full h-full">
            <div className="w-full h-full relative">
              <NullableDate
                color="#9f0404"
                text={`Нет данных от сенсора ${falseDate ? "за выбранный период" : ""}`}
              />
            </div>
            {falseDate && (
              <div className="w-full h-full relative  left-0 top-0 flex justify-center items-start backdrop-blur-sm z-30">
                <div className="border border-[#9f0404] text-[#9f0404] tracking-wider px-6 py-3 text-lg font-light  rounded-lg">
                  Последние данные:{" "}
                  {DateTime.fromSeconds(last_event_date).toLocaleString(DateTime.DATETIME_SHORT)}
                </div>
              </div>
            )}
          </div>
        )}
        <ChangedInfo />
        {typeof domain.min != "string" && (
          <div className="absolute w-fit my-1 z-[100] cursor-pointer bg-white px-1 py-0.5 flex items-center justify-center gap-3 right-2 top-12  rounded-lg">
            <button
              onClick={() => leftHandler()}
              className={`${
                isMin
                  ? "text-red-500 hover:bg-transparent active:bg-transparent "
                  : "bg-white hover:bg-gray-300 active:bg-gray-400"
              } w-6 aspect-square rounded-lg`}
            >
              {"<"}
            </button>

            <button
              onClick={zoomOut}
              title="zoom out"
              className="bg-white hover:bg-gray-300 w-6 aspect-square rounded-lg"
            >
              -
            </button>

            <button
              onClick={() => rightHandler()}
              className={`${
                isMax
                  ? "text-red-500 hover:bg-transparent active:bg-transparent text-red"
                  : "bg-white hover:bg-gray-300 active:bg-gray-400"
              } w-6 aspect-square rounded-lg`}
            >
              {">"}
            </button>
          </div>
        )}

        <div className="h-[89%] relative py-2 px-4 overflow-hidden">
          <div
            style={{
              gridTemplateColumns: "1% 99%",
            }}
            className="grid items-start gap-5 justify-end p-2 text-center h-1/2"
          >
            <div
              style={{
                writingMode: "vertical-lr",
                msWritingMode: "vertical-lr",
              }}
              className="w-[100%] relative text-lg h-[100%] "
            >
              Температура
            </div>
            <div className="w-[100%] h-full">
              {data == "loading" ? (
                <div className="w-full h-full pl-10">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>
              ) : (
                <TempChart />
              )}
            </div>
          </div>
          <div
            style={{
              gridTemplateColumns: "1% 99%",
            }}
            className="grid items-start gap-5 justify-end p-2 text-center h-1/2 "
          >
            <div
              style={{
                writingMode: "vertical-lr",
                msWritingMode: "vertical-lr",
              }}
              className="w-[100%] relative text-lg h-[100%] "
            >
              Давление
            </div>
            <div className="w-[100%] h-full">
              {data == "loading" ? (
                <div className="w-full h-full pl-10">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>
              ) : (
                <PressChart />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

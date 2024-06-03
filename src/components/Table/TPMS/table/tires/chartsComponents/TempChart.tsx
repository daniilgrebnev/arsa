import { AppDispatch, RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  setActiveWheelChartData,
  setDomain,
} from "../../../../../../store/reducers/wheelChart/wheelChart"
import { CustomTick } from "./CusomComponentsForChart/CustomTick"
import { CustomTooltipTemp } from "./CusomComponentsForChart/CustomTooltipTemp"

export const TempChart = () => {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector((state: RootState) => state.wheelChart.data)
  const domain = useSelector((state: RootState) => state.wheelChart.domain)
  const dataIsNoEmpty = typeof data != "string"
  const dataArr: any = dataIsNoEmpty && data != null && data.data
  const normTemp = dataIsNoEmpty && data != null ? data.norm.temperature_max : undefined
  const [moveValue, setMoveValue] = useState<any>({
    min: 0,
    max: 0,
  })
  useEffect(() => {}, [data])
  const [referenceAreaCoord, setReferenceAreaCoord] = useState<any>({
    min: undefined,
    max: undefined,
  })
  const activeLine = useSelector((state: RootState) => state.wheelChart.activeData?.event_date)

  const moveHandler = (min: number, max: number) => {
    dispatch(
      setDomain({
        min: moveValue.min,
        max: moveValue.max,
      }),
    )
  }
  const { min, max } = referenceAreaCoord
  const clickHandler = (value) => {
    if (value && typeof value === "object" && 0 in value) {
      const activeData = value[0].payload
      dispatch(setActiveWheelChartData(activeData))
    } else {
      dispatch(setActiveWheelChartData(null))
    }
  }
  return (
    <ResponsiveContainer height="100%">
      <LineChart
        onClick={(e) => clickHandler(e.activePayload)}
        data={dataArr}
        syncId="anyId"
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
        onMouseDown={(e) => {
          setReferenceAreaCoord({
            min: e.activeLabel,
            max: "",
          })
          moveValue.min = e.activeLabel
        }}
        onMouseMove={(e) => {
          if (min != undefined) {
            setReferenceAreaCoord({
              min: min,
              max: e.activeLabel,
            })
          }
        }}
        onMouseUp={(e) => {
          moveValue.max = e.activeLabel
          if (Math.abs(moveValue.max - moveValue.min) > 1000) {
            dispatch(
              setDomain({
                min: moveValue.min,
                max: moveValue.max,
              }),
            )
          }

          setReferenceAreaCoord({
            min: undefined,
            max: undefined,
          })
        }}
      >
        <CartesianGrid strokeDasharray="8 8" />
        <XAxis
          dataKey="event_date"
          tick={<CustomTick />}
          type="number"
          domain={[domain.min, domain.max]}
          allowDataOverflow
        />
        <YAxis dataKey="temp" />
        <Tooltip
          content={<CustomTooltipTemp />}
          cursor={{
            stroke: "#0f0367",
            strokeWidth: 1.5,
          }}
        />
        <ReferenceArea y1={normTemp} fill="#f14646d0" fillOpacity={1} ifOverflow="hidden" />
        <Line
          dot={<Rectangle className="" width={2} height={2} fill="black" />}
          activeDot={{
            r: 7,

            fill: "#00000058",
            stroke: "transparent",
          }}
          type="monotone"
          dataKey="temp"
          stroke="#3d85e9"
          fill="transparent"
          strokeWidth={2}
        />
        <ReferenceArea
          fill="#0000004c"
          x1={min}
          x2={max}
          stroke="#000"
          fillOpacity={min == undefined ? 0 : 1}
        />

        <ReferenceLine x={activeLine} stroke="#303030" fillOpacity={1} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

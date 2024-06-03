import { AppDispatch, RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  CartesianGrid,
  Line,
  LineChart,
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
import { CustomTooltipPress } from "./CusomComponentsForChart/CustomTooltipPress"

export const PressChart = () => {
  const dispatch = useDispatch<AppDispatch>()

  const clickHandler = (value) => {
    if (value && typeof value === "object" && 0 in value) {
      const activeData = value[0].payload
      dispatch(setActiveWheelChartData(activeData))
    } else {
      dispatch(setActiveWheelChartData(null))
    }
  }

  const activeLine = useSelector((state: RootState) => state.wheelChart.activeData?.event_date)

  const norm = useSelector((state: RootState) =>
    typeof state.wheelChart.data != "string" ? state.wheelChart.data?.norm : null,
  )

  const data: any = useSelector(
    (state: RootState) => typeof state.wheelChart.data != "string" && state.wheelChart.data?.data,
  )
  const domain = useSelector((state: RootState) => state.wheelChart.domain)

  useEffect(() => {}, [domain, data])

  const [moveValue, setMoveValue] = useState<any>({
    min: 0,
    max: 0,
  })

  const [referenceAreaCoord, setReferenceAreaCoord] = useState<any>({
    min: undefined,
    max: undefined,
  })

  const moveHandler = (min: number, max: number) => {
    dispatch(
      setDomain({
        min: moveValue.min,
        max: moveValue.max,
      }),
    )
  }

  const { min, max } = referenceAreaCoord

  return (
    <>
      <ResponsiveContainer height="100%" width={"100%"}>
        <LineChart
          onClick={(e) => {
            clickHandler(e.activePayload)
            setReferenceAreaCoord({
              min: "dataMin - 10%",
              max: "dataMax + 10%",
            })
          }}
          syncId="anyId"
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
          <CartesianGrid strokeDasharray="8 10" />
          <XAxis
            dataKey="event_date"
            tick={<CustomTick />}
            type="number"
            domain={[domain.min, domain.max]}
            allowDataOverflow
          />
          <YAxis dataKey="pressure" domain={["dataMin-150", "dataMax+150"]} />
          <Tooltip
            content={<CustomTooltipPress />}
            cursor={{
              stroke: "#0f0367",
              strokeWidth: 1.5,
            }}
          />

          <ReferenceArea
            y1={norm?.pressure_norm && norm?.pressure_norm - norm.pressure_delta}
            y2={norm?.pressure_norm && norm?.pressure_norm + norm.pressure_delta}
            fill="#5a9664c7"
            fillOpacity={9}
            ifOverflow="hidden"
          />
          <ReferenceArea
            y2={norm?.pressure_norm && norm?.pressure_norm - norm.pressure_delta}
            fill="#f14646d0"
            fillOpacity={1}
            ifOverflow="hidden"
          />
          <ReferenceArea
            y1={norm?.pressure_norm && norm?.pressure_norm + norm.pressure_delta}
            fill="#f14646d0"
            fillOpacity={1}
            ifOverflow="hidden"
          />

          <Line
            dataKey="pressure"
            strokeWidth={2}
            className="cursor-pointer"
            stroke="#000"
            dot={false}
            activeDot={{
              r: 7,

              fill: "#00000058",
              stroke: "transparent",
            }}
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
    </>
  )
}

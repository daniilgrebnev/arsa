import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { DateTime } from "ts-luxon"
import { setFilter, setInitialFilter } from "../../../../../store/reducers/filters/filters"
import { setPage } from "../../../../../store/reducers/tpms/tpms"
import { CustomTooltip } from "./CustomTooltip"
import "./style.css"

const Press = (propsChartData: any) => {
  const dispatch = useDispatch<AppDispatch>()
  // const checkedData = useSelector(
  // 	(state: RootState) => state.security.vehiclesCheked
  // )
  // useEffect(() => {}, [checkedData])

  const notNorm = (data) => {
    const timeCheck = data.filter((item) =>
      item.wheel_pressure.some(
        (i) => i.d && DateTime.now().toSeconds() - i.d < item.settings.sensors_valid_time_period,
      ),
    )
    const count = timeCheck.filter((item) => item.sensors_out_of_norm).length

    return count || 0
  }

  const chartData = propsChartData.data

  const data = [
    {
      name: "В норме",
      filter: "allNorm",
      color: "#5eb143",
      count: chartData ? chartData.filter((i) => i.all_sensors_in_norm == true).length : 0,
    },
    {
      name: "Вне нормы",
      filter: "allNotNorm",
      color: "#e94040",
      count: chartData ? notNorm(chartData) : 0,
    },
    {
      name: "Устаревшие данные",
      filter: "olderData",
      color: "#f5cc16",
      count: chartData
        ? chartData.filter(
            (i, index) =>
              chartData[index].wheel_pressure.length !== 0 &&
              Math.round(new Date().getTime() / 1000) - i.last_event_date <
                i.settings.sensors_valid_time_period &&
              chartData,
          ).length
        : 100,
    },
    {
      name: "Н/д",
      filter: "noData",
      color: "#b0aeae",
      count: chartData ? chartData.filter((i) => i.sensors_without_data == true).length : 0,
    },
  ]

  return (
    <div className="w-full h-full ">
      <ResponsiveContainer width={`100%`} height={"100%"}>
        <BarChart
          className=""
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" interval={0} fontSize={13} />
          <YAxis dataKey="count" domain={[0, "dataMax + 100"]} />
          <Tooltip content={CustomTooltip} cursor={{ fillOpacity: 0 }} />

          <Bar dataKey="count" background={{ fillOpacity: 0 }}>
            {data.map((entry, index) => (
              <>
                <LabelList dataKey="count" position="top" />
                <Cell
                  className="cursor-pointer rounded-t-lg overflow-hidden relative"
                  onClick={() => {
                    dispatch(setInitialFilter())
                    dispatch(setFilter(entry.filter))
                    dispatch(setPage("table"))
                  }}
                  style={{
                    borderRadius: 10,
                  }}
                  key={index}
                  fill={entry.color}
                  radius={5}
                />
              </>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Press

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
import { setFilter, setInitialFilter } from "../../../../../store/reducers/filters/filters"
import { setPage } from "../../../../../store/reducers/tpms/tpms"
import { CustomTooltip } from "./CustomTooltip"

const VehicleInfo = (propsChartData: any) => {
  const chartData = propsChartData.data
  const dispatch = useDispatch<AppDispatch>()

  const data = [
    {
      name: "Задержка+30м",
      filter: "delay30minFromTS",
      color: "#f5cc16",
      count: chartData
        ? chartData.filter(
            (i) => Math.round(new Date().getTime() / 1000) - i.last_event_date > 1800,
          ).length
        : 0,
    },
    {
      name: "Нет данных",
      filter: "noDataFromTS",
      color: "#e94040",
      count: chartData ? chartData.filter((i) => i.last_event_date === 0).length : 0,
    },
    {
      name: "Грузовые",
      filter: "truck",
      color: "orangered",
      count: chartData ? chartData.filter((i) => i.category_name == "Грузовые").length : 0,
    },
    {
      name: "Легковые",
      filter: "auto",
      color: "orangered",
      count: chartData ? chartData.filter((i) => i.category_name == "Легковые").length : 0,
    },
    {
      name: "Трактор",
      filter: "tractor",
      color: "orangered",
      count: chartData ? chartData.filter((i) => i.category_name == "Трактор").length : 0,
    },
    {
      name: "Все",
      filter: "all",
      color: "#363636",
      count: chartData ? chartData.length : 0,
    },
  ]

  return (
    <div className="w-full h-full">
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

          <Bar dataKey="count" strokeWidth={2} background={{ fillOpacity: 0 }}>
            {data.map((entry, index) => (
              <>
                <LabelList dataKey="count" position="top" />
                <Cell
                  onClick={() => {
                    dispatch(setInitialFilter())
                    dispatch(setFilter(entry.filter))
                    dispatch(setPage("table"))
                  }}
                  style={{
                    borderRadius: 10,
                  }}
                  className="rounded-t-lg overflow-hidden "
                  key={index}
                  fill={entry.color}
                  cursor={"pointer"}
                  // fillOpacity={'70%'}
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

export default VehicleInfo

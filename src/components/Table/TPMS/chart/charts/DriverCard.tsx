import { ITableData } from "@/interfaces/table"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  Bar,
  BarChart,
  Cell,
  Label,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { setFilter, setInitialFilter } from "../../../../../store/reducers/filters/filters"
import { setPage } from "../../../../../store/reducers/tpms/tpms"
import { CustomTooltip } from "./CustomTooltip"

interface IChartData {
  name: string
  color: string
  count: number
  filter: string
}

export const DriverCard = (propsChartData: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const chartData: ITableData[] = propsChartData.data

  const data: IChartData[] = [
    {
      name: "С картой водителя",
      filter: "workWithCard",
      color: "#5eb143",
      count: chartData.filter((i) => i.driver.driver_code !== null && i.driver.driver_name !== null)
        .length,
    },
    {
      name: "С картой (н/д водитель)",
      filter: "cardWithoutDriver",
      color: "#f5cc16",
      count: chartData.filter((i) => i.driver.driver_code !== null && i.driver.driver_name == null)
        .length,
    },
    {
      name: "Без карты",
      filter: "workWithoutCard",

      color: "#e94040",
      count: chartData.filter((i) => i.driver.driver_code == null).length,
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
          <XAxis dataKey="name" interval={0} fontSize={13}>
            <Label offset={0} />
          </XAxis>
          <YAxis dataKey="count" domain={[0, "dataMax + 100"]} />
          <Tooltip content={CustomTooltip} cursor={{ fillOpacity: 0 }} />

          <Bar dataKey="count" background={{ fillOpacity: 0 }}>
            {data.map((entry, index) => (
              <>
                <LabelList dataKey="count" position="top" />
                <Cell
                  cursor={"pointer"}
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

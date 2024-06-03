import { ITableData } from "@/interfaces/table"
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
import { getActiveTires } from "../../../../../helpers/getActiveTires"
import { setFilter, setInitialFilter } from "../../../../../store/reducers/filters/filters"
import { setPage } from "../../../../../store/reducers/tpms/tpms"
import { CustomTooltip } from "./CustomTooltip"

function extractWheels(data) {
  // Создаем объект для хранения уникальных колес
  const wheels = {}

  // Проходимся по каждой строке в массиве данных
  data.forEach((entry) => {
    // Разбиваем строку на отдельные элементы
    const elements = entry.split("; ")

    // Проходимся по каждому элементу
    elements.forEach((element) => {
      // Убираем лишние пробелы
      const wheel = element.trim()

      // Добавляем колесо в объект, если оно уникально
      if (!wheels[wheel]) {
        wheels[wheel] = true
      }
    })
  })

  // Возвращаем массив уникальных колес
  return Object.keys(wheels)
}

export let globalTires
export const Tire = (propsChartData: any) => {
  const chartData: ITableData[] = propsChartData.data
  let tire: any[] = []
  tire.push(chartData.map((item) => item.wheel_model_names))
  tire = tire[0].filter((i) => i != "")
  tire = extractWheels(tire)
  const activeTires = getActiveTires(chartData)

  const dispatch = useDispatch<AppDispatch>()

  const data = [
    {
      name: "Нет данных",
      color: "#e94040",
      count: chartData.filter((i, index) => i.wheel_pressure.some((i) => i.wmn !== "")).length,
      filter: "noDataFromTire",
    },
  ]

  for (let i = 0; i < activeTires.length; i++) {
    const tireCurrent = activeTires[i]
    const newItem = {
      name: tireCurrent,
      color: "#4340e9",
      count: chartData.filter((i, index) => i.wheel_pressure.some((i) => i.wmn == tireCurrent))
        .length,
      filter: `tire-${tireCurrent}`,
    }

    data.push(newItem)
  }

  console.log(globalTires)

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

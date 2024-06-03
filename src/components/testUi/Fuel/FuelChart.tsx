import { RootState } from "@/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export const FuelChart = () => {
  const data: any = useSelector((state: RootState) => state.fuel).data
  const dataArr: any = data !== null ? (typeof data != "string" ? data.data : undefined) : undefined
  useEffect(() => {}, [data])

  return (
    <div className="w-full h-full   ">
      {dataArr && (
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            width={730}
            height={250}
            data={dataArr}
            margin={{ top: 120, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dot={false} dataKey="raw" stroke="#e72600" strokeWidth={1} />
            <Line
              dataKey="approximated"
              activeDot={false}
              stroke="#0d00ff"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

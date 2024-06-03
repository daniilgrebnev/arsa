import { RootState } from "@/store/store"
import React from "react"
import { useSelector } from "react-redux"
import { Skeleton } from "../../../../components/Loading/Skeleton"
import { DriverCard } from "./charts/DriverCard"
import Press from "./charts/Press"
import { Tire } from "./charts/Tire"
import VehicleInfo from "./charts/VechicleInfo"

export const Chart = () => {
  interface ICharts {
    title: string
    chart: React.ReactNode
  }

  const checkedData = useSelector((state: RootState) => state.security.vehiclesCheked)
  const data = useSelector((state: RootState) => state.table.data)

  const charts: ICharts[] = [
    {
      title: "Давление",
      chart: <Press data={data} />,
    },
    {
      title: "Информация о ТС",
      chart: <VehicleInfo data={data} />,
    },
    {
      title: "Карта водителя",
      chart: <DriverCard data={data} />,
    },
    {
      title: "Резина",
      chart: <Tire data={data} />,
    },
  ]

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 mx-auto px-3 h-[85dvh]">
      {charts.map((chartItem, index) => (
        <>
          {data === "loading" ? (
            <Skeleton width={"100%"} height={"100%"} />
          ) : (
            <>
              {data != null && typeof data != "string" && (
                <div key={index} className="text-center h-full">
                  <div className="bg-gray-200 w-full h-full p-4 rounded-lg border border-orange-600">
                    <p className="text-lg font-medium">{chartItem.title}</p>
                    <div className="w-full h-full flex items-center justify-center">
                      {chartItem.chart}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ))}
    </div>
  )
}

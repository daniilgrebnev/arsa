import { ITableData } from "@/interfaces/table"
import { AppDispatch, RootState } from "@/store/store"
import moment from "moment"
import "moment/locale/ru"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { Skeleton } from "../../../../components/Loading/Skeleton"
import { tableFilter } from "../../../../helpers/table-filters"
import { tableSort } from "../../../../helpers/table-sorting"
import { setVehicleUID, setWheelId, setWidgetInfo } from "../../../../store/reducers/car/car"
import { thunkGetCarData } from "../../../../store/reducers/car/carThunk"
import { setDefaultWheelChart } from "../../../../store/reducers/wheelChart/wheelChart"
import { CircleIndicatorContainer } from "./CircleIndicatorContainer"

export const TableBody = () => {
  moment.locale("ru")
  let [newData, setNewData] = useState<ITableData[]>([])
  const { filters, type } = useSelector((state: RootState) => state.filters)
  const defaultData = useSelector((state: RootState) => state.table.data)
  const searchedData = useSelector((state: RootState) => state.table.searchedTableData)
  const { vehicle_uid } = useSelector((state: RootState) => state.car)
  const data = searchedData?.length == 0 || searchedData == null ? defaultData : searchedData
  const direction = useSelector((state: RootState) => state.table.direction)
  let sort = useSelector((state: RootState) => state.table.sort)

  const { checkedVehicles } = useSelector((state: RootState) => state.vehicles)
  const [id, setId] = useState<string>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (typeof data !== "string") {
      if (sort != "") {
        setNewData(tableSort(data, sort, direction))
      } else {
        setNewData(data)
      }
    }
  }, [sort, data, direction, checkedVehicles, type, defaultData])

  const handleActive = (_id: string, isEmpty: boolean) => {
    dispatch(setVehicleUID(_id))
    dispatch(thunkGetCarData(_id))
    setId(_id)
    dispatch(setDefaultWheelChart())
    dispatch(setWheelId(null))
    dispatch(setWidgetInfo(null))

    localStorage.setItem("select_table_id", _id)
  }
  const filteredData: ITableData[] = tableSort(
    filters.length != 0 ? tableFilter(newData, filters, type) : newData,
    sort,
    direction,
  )

  return (
    <>
      {newData.length > 0 ? (
        filteredData.map((i: any, index: any) => (
          <tr
            key={index}
            onClick={() => {
              const isEmpty = i.wheel_pressure.length == 0
              handleActive(i.vehicle_uid, isEmpty)
            }}
            className={
              i.vehicle_uid == id
                ? "active text-ellipsis text-nowrap overflow-hidden"
                : "text-ellipsis text-nowrap overflow-hidden"
            }
          >
            <td title={i.category_name} colSpan={2} className="">
              <span className="px-1">{i.category_name}</span>
            </td>
            <td title={i.vehicle_name} colSpan={2}>
              <span className="px-1 ">{i.vehicle_name}</span>
            </td>
            <td
              title={
                i.last_event_date > 0
                  ? DateTime.fromSeconds(i.last_event_date).toRelative()
                  : "Никогда"
              }
              colSpan={2}
            >
              <span className="px-1">
                {i.last_event_date > 0 && (
                  <>
                    {DateTime.fromSeconds(i.last_event_date).toLocaleString(
                      DateTime.TIME_24_SIMPLE,
                    )}
                    <span> | </span>
                    {DateTime.fromSeconds(i.last_event_date).toLocaleString(DateTime.DATE_SHORT)}
                  </>
                )}
              </span>
            </td>
            <td title={i.driver.driver_code ? i.driver.driver_code : "Н/д"} colSpan={2}>
              <span className="text-left px-1 w-full block">
                {i.driver.driver_name
                  ? i.driver.driver_name
                  : i.driver.driver_code
                    ? i.driver.driver_code
                    : ""}
              </span>
            </td>
            <td title={i.axes_count} colSpan={2}>
              <span className="text-center w-full block">{i.axes_count}</span>
            </td>
            <td colSpan={2}>
              <CircleIndicatorContainer
                data={i.wheel_pressure}
                valid_period={filteredData[index].settings.sensors_valid_time_period | 0}
              />
            </td>
            <td colSpan={2}>
              <span className="">
                {i.wheel_pressure.map((i: { t: number | null; t_max: number }) => (
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: i.t != null ? (i.t > i.t_max ? "rgb(252 165 165)" : "") : "",
                    }}
                  ></span>
                ))}
              </span>
            </td>
            <td
              title={
                i.wheel_pressure
                  ? i.wheel_pressure.map((i: { wmn: string }) => (i.wmn ? i.wmn + " " : ""))
                  : "Н/д"
              }
              colSpan={2}
            >
              <span className="px-1">
                {i.wheel_pressure
                  ? i.wheel_pressure.map((i: { wmn: string }) => (i.wmn ? i.wmn + ", " : ""))
                  : "Н/д"}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <>
          {data == "loading" || checkedVehicles.length != 0 ? (
            <div className="absolute top-[100px] h-full text-3xl w-full text-center  left-0">
              <div className=" h-full flex items-center justify-center w-[95%] mx-auto bg-gray-200 rounded-lg">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {defaultData != "loading" && filteredData.length == 0 && (
        <div className="absolute top-[150px]  text-3xl w-full text-center  left-0">
          <div className=" h-20 flex items-center justify-center w-1/2 mx-auto bg-gray-200 rounded-lg">
            <p>Ничего не найдено</p>
          </div>
        </div>
      )}
      {defaultData.length == 0 && (
        <div className="absolute top-[150px]  text-3xl w-full text-center  left-0">
          <div
            style={{
              boxShadow: "0px 0px 20px 10px #d6d6d6",
            }}
            className=" h-20 flex items-center justify-center w-1/2 mx-auto bg-gray-200 rounded-sm "
          >
            <p>Объекты не выбраны</p>
          </div>
        </div>
      )}
    </>
  )
}

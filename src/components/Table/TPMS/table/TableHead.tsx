/* eslint-disable */
import { RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ColumnResizer from "react-table-column-resizer"
import { setDirection, setSort } from "../../../../store/reducers/table/table"
import "./style.css"

interface Pos {
  xs: number
  xe: number
}

let arr: Pos = { xs: 0, xe: 0 }

export const TableHead = () => {
  const sort = useSelector((state: RootState) => state.table.sort)
  const dispatch = useDispatch()
  const [order, setOrder] = useState(false)

  const tableHeadItem = [
    {
      name: "Категория",
      value: "category_name",
      width: "12.5%",
    },
    {
      name: "Гос-номер",
      value: "vehicle_name",
      width: "12.5%",
    },
    {
      name: "Посл. данные",
      value: "last_event_date",
      width: "12.5%",
    },
    {
      name: "Водитель",
      value: "driver_name",
      width: "12.5%",
    },
    {
      name: "Кол-во осей",
      value: "axes_count",
      width: "8.5%",
    },
    {
      name: "Давление",
      value: "press",
      width: "16.5%",
    },
    {
      name: "Перегрев",
      value: "t-delta",
      width: "12.5%",
    },
    {
      name: "Резина",
      value: "t-wheel_model_names",
      width: "12.5%",
    },
  ]
  const [currentId, setCurrentId] = useState<number>()

  const clickHandler = (sortName: string) => {
    if (sortName === sort) {
      dispatch(setDirection())
    } else {
      dispatch(setSort(sortName))
    }
  }

  return (
    <tr className="relative ">
      {tableHeadItem.map((item, index) => (
        <>
          <ColumnResizer
            minWidth={0}
            maxWidth={null}
            id={index}
            resizeStart={() => {}}
            resizeEnd={() => {}}
            className={""}
            disabled={false}
          />
          <th
            style={{
              width: item.width,
            }}
            id={item.value}
            key={index}
            className="relative cursor-pointer text-sm font-thin text-wrap overflow-hidden px-1 h-10 "
            onClick={() => clickHandler(item.value)}
          >
            <p className="w-full h-full flex   items-center justify-center z-10 relative">
              {item.name}
            </p>
          </th>
        </>
      ))}
    </tr>
  )
}

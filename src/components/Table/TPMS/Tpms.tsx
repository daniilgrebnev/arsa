import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Fuel } from "../../../components/testUi/Fuel/Fuel"
import { filterChecked } from "../../../helpers/checked-data-filter"
import { thunkGetTableData } from "../../../store/reducers/table/tableThunk"
import { setPage } from "../../../store/reducers/tpms/tpms"
import { Catalog } from "./catalog/Catalog"
import { Chart } from "./chart/Chart"
import "./style.css"
import { SwitchTire } from "./switchTire/SwitchTire"
import { SwitchHistory } from "./switchTire/switch-history/SwitchHistory"
import { Table } from "./table/Table"

interface ITmpsNavItem {
  title: string
  value: "chart" | "table"
}

export const Tpms = () => {
  const page = useSelector((state: RootState) => state.tpms.page)
  const [activeReport, setActiveReport] = useState(page)
  const dispatch = useDispatch<AppDispatch>()
  const checkedItems: string[] = filterChecked(
    useSelector((state: any) => state.security.vehiclesCheked),
  )
  const isOpenCatalog = useSelector((state: RootState) => state.catalog.isOpen)
  const isOpenSwitch = useSelector((state: RootState) => state.switchTire.isOpen)
  const isOpenSwitchHistory = useSelector((state: RootState) => state.switchHistory.isOpen)
  const isOpenFuel = useSelector((state: RootState) => state.fuel.isOpen)

  useEffect(() => {
    dispatch(thunkGetTableData(checkedItems))
  })

  const tpmsNav: ITmpsNavItem[] = [
    {
      title: "Отчет графики",
      value: "chart",
    },
    {
      title: "Отчет таблица",
      value: "table",
    },
  ]
  return (
    <div>
      {isOpenCatalog && <Catalog />}
      {isOpenSwitch && <SwitchTire />}
      {isOpenSwitchHistory && <SwitchHistory />}
      {isOpenFuel && <Fuel />}

      <nav className="flex mb-3 items-center w-fit mx-auto bg-gray-200 rounded-lg mt-3 justify-between px-3 py-2 gap-5">
        {tpmsNav.map((item: ITmpsNavItem, index) => (
          <div
            onClick={() => {
              dispatch(setPage(item.value))

              // dispatch(setInitialFilter())
            }}
            className={`report-tab ${
              page === item.value && "active"
            } hover:text-gray-500 cursor-pointer`}
            key={index}
          >
            {item.title}
          </div>
        ))}
      </nav>
      {page === "table" && <Table />}
      {page === "chart" && <Chart />}
    </div>
  )
}

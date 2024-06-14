import { AppDispatch, RootState } from "@/store/store"
import debounce from "lodash/debounce"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { driversCheckboxTree } from "../../../components/testUi/CheckboxTree/drivers-process"
import { setCheckedDrivers } from "../../../store/reducers/drivers/driverSlice"
import { thunkGetDriversTree } from "../../../store/reducers/drivers/driverThunk"
import { thunkGetTableData } from "../../../store/reducers/table/tableThunk"
import { Ok } from "../../../styles/image/Ok"

const DriverLabel: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="">{item.name}</div>
      {/* <div className="bg-white py-0.5 px-1 rounded">{item.driver_code}</div> */}
    </div>
  )
}

export const DriverTree = () => {
  const { data, filteredData, isSearch, checkedDrivers } = useSelector(
    (state: RootState) => state.driver,
  )
  const [checked, setChecked] = useState<string[]>(checkedDrivers)
  const [pendingChecked, setPendingChecked] = useState<string[]>(checkedDrivers)
  const dispatch = useDispatch<AppDispatch>()

  const checkedVehicles = useSelector((state: RootState) => state.vehicles.checkedVehicles)

  // Initial fetch of driver data
  useEffect(() => {
    dispatch(thunkGetDriversTree())
  }, [dispatch])

  // Update checked drivers and fetch table data when checked state changes
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  useEffect(() => {
    if (!isInitialLoad) {
      // Проверяем, что это не первоначальная загрузка
      const uniqChecked = Array.from(new Set(checked))
      dispatch(setCheckedDrivers(uniqChecked))
      dispatch(thunkGetTableData({ vehicle_uids: checkedVehicles, driver_uids: uniqChecked }))
    } else {
      setIsInitialLoad(false) // Устанавливаем, что первоначальная загрузка прошла
    }
  }, [checked])

  // Debounce the update to prevent rapid state changes
  const debouncedSetChecked = debounce((newChecked: string[]) => {
    setChecked(newChecked)
  }, 300)

  const handleCheckedChange = (newChecked: string[]) => {
    setPendingChecked(newChecked)
    debouncedSetChecked(newChecked)
  }

  const groups =
    typeof filteredData !== "string" && filteredData != null
      ? driversCheckboxTree(filteredData)
      : []
  console.log(groups)

  return (
    <>
      {filteredData != null && (
        <div className="w-full h-screen overflow-y-auto text-sm px-4 ">
          <CheckboxTree
            CheckboxLabel={DriverLabel}
            data={groups}
            keyword={"children"}
            checkField={"driver_uid"}
            checked={pendingChecked}
            onChecked={handleCheckedChange}
            expandAll={isSearch}
            iconCheck={
              <div className="w-[18px] aspect-square rounded bg-orange-500 flex items-center justify-center align-middle">
                <Ok fill="white" width={10} />
              </div>
            }
            iconNonCheck={
              <div className="w-[18px] aspect-square rounded border border-orange-500"></div>
            }
            iconHalfCheck={
              <div className="w-[18px] h-[18px] text-white rounded bg-orange-500 flex items-center justify-center">
                -
              </div>
            }
            iconExpand={<div className="icon-folder-open text-lg text-white"></div>}
            iconNonExpand={<div className="icon-folder text-lg"></div>}
          />
        </div>
      )}
    </>
  )
}

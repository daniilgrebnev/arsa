import { AppDispatch, RootState } from "@/store/store"
import { uniq } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NullableDate } from "../../../components/NullableDate/NullableDate"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { vehicleCheckboxTree } from "../../../components/testUi/CheckboxTree/checkbox-process"
import { thunkGetTableData } from "../../../store/reducers/table/tableThunk"
import { setCheckedVehicles } from "../../../store/reducers/vehicles/vehicleSlice"
import { Ok } from "../../../styles/image/Ok"
import { Ignition } from "../icons/Ignition"

const Label: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-xs">{item.vehicle_name}</div>
      <div className="">
        {item.last_pos?.is_ignition_on ? (
          <Ignition fill="green" width={16} />
        ) : (
          <Ignition fill="red" width={16} />
        )}
      </div>
    </div>
  )
}

export const VehicleTree = () => {
  const { data, filteredData, isSearch } = useSelector((state: RootState) => state.vehicles)
  const dispatch = useDispatch<AppDispatch>()
  const [checked, setChecked] = useState<string[]>([])
  useEffect(() => {
    dispatch(setCheckedVehicles(uniq(checked)))
    dispatch(thunkGetTableData(checked))
  }, [checked])
  useEffect(() => {}, [])
  const groups: any[] = vehicleCheckboxTree(filteredData)
  console.log(groups, filteredData)
  return (
    <div className="max-h-[67dvh] overflow-y-auto text-sm w-full">
      <div className="w-full">
        {typeof data != "string" && data != null && (
          <div className="w-full">
            {filteredData.length != 0 ? (
              <div className="w-full">
                <CheckboxTree
                  CheckboxLabel={Label}
                  data={groups}
                  keyword={"children"}
                  checkField="vehicle_uid"
                  checked={checked}
                  onChecked={setChecked}
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
            ) : (
              <div className="text-lg text-red-500 font-light text-center">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>

      {data == "loading" && <NullableDate text="Загрузка..." color="green" />}
      {data == "error" && <NullableDate text="Ошибка" color="red" />}
      {data == null && <NullableDate text="Неверный порядок запросов" color="red" />}
    </div>
  )
}

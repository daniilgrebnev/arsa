import { AppDispatch, RootState } from "@/store/store"
import { uniq } from "lodash"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NullableDate } from "../../../components/NullableDate/NullableDate"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { thunkGetTableData } from "../../../store/reducers/table/tableThunk"
import { setCheckedVehicles } from "../../../store/reducers/vehicles/vehicleSlice"
import { Ok } from "../../../styles/image/Ok"

export const VehicleTree = () => {
  const { data, filteredData } = useSelector((state: RootState) => state.vehicles)
  const dispatch = useDispatch<AppDispatch>()
  const [checked, setChecked] = useState<string[]>([])
  useLayoutEffect(() => {
    dispatch(setCheckedVehicles(uniq(checked)))
    dispatch(thunkGetTableData(checked))
  }, [checked])

  return (
    <div className="max-h-[75dvh] overflow-y-auto text-sm">
      <>
        {typeof data != "string" && (
          <CheckboxTree
            data={filteredData}
            keyword={"children"}
            checked={checked}
            onChecked={setChecked}
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
        )}
      </>

      {data == "loading" && <NullableDate text="Загрузка..." color="green" />}
      {data == "error" && <NullableDate text="Ошибка" color="red" />}
      {data == null && <NullableDate text="Неверный порядок запросов" color="red" />}
    </div>
  )
}

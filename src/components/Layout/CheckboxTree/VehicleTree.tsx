import { AppDispatch, RootState } from "@/store/store"
import { uniq } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NullableDate } from "../../../components/NullableDate/NullableDate"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { checkboxProcess } from "../../../components/testUi/CheckboxTree/checkbox-process"
import { thunkGetTableData } from "../../../store/reducers/table/tableThunk"
import { setCheckedVehicles } from "../../../store/reducers/vehicles/vehicleSlice"
import { Ok } from "../../../styles/image/Ok"

export const VehicleTree = () => {
  const { data, filteredData, isSearch } = useSelector((state: RootState) => state.vehicles)
  const dispatch = useDispatch<AppDispatch>()
  const [checked, setChecked] = useState<string[]>([])
  useEffect(() => {
    dispatch(setCheckedVehicles(uniq(checked)))
    dispatch(thunkGetTableData(checked))
  }, [checked])
  useEffect(() => {}, [])
  const groups: any[] = checkboxProcess(filteredData)
  return (
    <div className="max-h-[75dvh] overflow-y-auto text-sm">
      <>
        {typeof data != "string" && (
          <>
            {filteredData.length != 0 ? (
              <>
                <CheckboxTree
                  data={groups}
                  keyword={"children"}
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
              </>
            ) : (
              <div className="text-lg text-red-500 font-light text-center">Ничего не найдено</div>
            )}
          </>
        )}
      </>

      {data == "loading" && <NullableDate text="Загрузка..." color="green" />}
      {data == "error" && <NullableDate text="Ошибка" color="red" />}
      {data == null && <NullableDate text="Неверный порядок запросов" color="red" />}
    </div>
  )
}

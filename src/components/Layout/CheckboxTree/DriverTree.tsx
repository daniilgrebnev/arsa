import { AppDispatch } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { driversCheckboxTree } from "../../../components/testUi/CheckboxTree/drivers-process"
import { apiHandler } from "../../../helpers/apiHandler"
import { setCheckedDrivers, setDriversData } from "../../../store/reducers/drivers/driverSlice"
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
  const [checked, setChecked] = useState<string[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const { data, filteredData } = useSelector((state: any) => state.driver)
  const getTree = (data) => {
    dispatch(setDriversData(data))
  }
  useEffect(() => {
    const query = {
      url: "/tpms/v1/ctl/drivers/get_tree_drivers",
      dispatcher: getTree,
    }
    data == null && dispatch(apiHandler({ dispatcher: query.dispatcher, url: query.url }))

    dispatch(setCheckedDrivers(checked))
  }, [checked])

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
        </div>
      )}
    </>
  )
}

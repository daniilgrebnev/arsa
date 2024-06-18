import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CheckboxTree from "../../../components/testUi/CheckboxTree/CheckboxTree"
import { geoZoneCheckboxTree } from "../../../components/testUi/CheckboxTree/geo-zones-process"
import { thunkGetGeoZonesTree } from "../../../store/reducers/geozones/thunkGeozones"
import { Ok } from "../../../styles/image/Ok"

export const GeozoneTree = () => {
  const data = useSelector((state: RootState) => state.geoZones.filteredData)
  const fetchedData = useSelector((state: RootState) => state.geoZones.data)
  const checkedZones = useSelector((state: RootState) => state.geoZones.checkedGeoZones)
  const dispatch = useDispatch<AppDispatch>()

  const [checked, setChecked] = useState<string[]>([])
  useEffect(() => {
    data == null && dispatch(thunkGetGeoZonesTree())
  }, [checked])

  const groups = data != null ? geoZoneCheckboxTree(fetchedData) : []
  console.log(data)
  return (
    <div className="text-sm">
      <CheckboxTree
        data={groups}
        keyword={"children"}
        checkField="geozone_uid"
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
  )
}

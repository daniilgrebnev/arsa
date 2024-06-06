import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { findGroupId } from "../../../../helpers/findGroupId"

export const SearchCheckBox = (vehicleArr: any) => {
  const vehicle = vehicleArr.vehicle
  const dispatch = useDispatch<AppDispatch>()
  const { checkedVehicles, data, filteredData } = useSelector((state: RootState) => state.vehicles)
  const groups = useSelector((state: RootState) => state.security.groupsVehicle)
  const groupId = findGroupId(groups, vehicle.vehicle_uid)
  const onChangeHandler = (text) => {
    // if (text.length > 0) {
    //   const searchFilter = filteredData.filter((item) =>
    //     item.vehicles?.some((i) => i.vehicle_name.includes(text)),
    //   )
    //   dispatch(setFilteredData(searchFilter))
    // } else {
    //   dispatch(setDefaultFilteredData())
    // }
  }
  return (
    <label key={vehicle.vehicle_uid} className="tree-folder__element">
      <div
        className={`tree-folder__checkbox ${
          checkedVehicles.includes(vehicle) ? "icon-checked" : ""
        }`}
      ></div>
      <input
        type="checkbox"
        checked={checkedVehicles.includes(vehicle)}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <div className="text-white cursor-pointer">{vehicle.vehicle_name}</div>
    </label>
  )
}

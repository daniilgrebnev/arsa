import { RootState } from "@/store/store"
import { useState } from "react"
import { useSelector } from "react-redux"
import { DriverTree } from "./DriverTree"
import { GeozoneTree } from "./GeozoneTree"
import { Search } from "./Search/Search"
import { VehicleTree } from "./VehicleTree"
import "./style.css"

export const CheckboxTreeContainer = () => {
  const [activeTab, setActiveTab] = useState("transport")
  // const countCheckedVehicle = useSelector((state: RootState) => state.security.vehiclesChecked)
  // const countCheckedGeozone = useSelector((state: RootState) => state.security.geozonesChecked)
  const vehicleTreeData = useSelector((state: RootState) => state.vehicles.data)
  const groups = useSelector((state: RootState) => state.security.groupsVehicle)
  const selectedVehiclesLength = useSelector(
    (state: RootState) => state.vehicles.checkedVehicles,
  ).length
  const searchedGroups = useSelector((state: RootState) => state.security.searchedVehicle)
  const currentGroups = searchedGroups == null ? groups : searchedGroups

  const tabs = [
    {
      title: "Транспорт",
      value: "transport",
    },
    {
      title: "Водители",
      value: "driver",
    },
    {
      title: "Геозона",
      value: "geoZone",
    },
  ]

  return (
    <div className="mx-auto rounded-t-lg menu-main ">
      <nav
        className="flex items-center justify-between my-2 px-4 py-3"
        style={{
          borderBottom: "solid 2px var(--main-color)",
          paddingBottom: "21px",
        }}
      >
        {tabs.map((tab, index) => (
          <div
            onClick={() => setActiveTab(tab.value)}
            className={`left-bar-tab ${activeTab === tab.value ? "active" : ""} text-center cursor-pointer hover:text-gray-500`}
            key={index}
          >
            {tab.title} {tab.value === "transport" && selectedVehiclesLength}
            {tab.value === "geoZone" && 0}
          </div>
        ))}
      </nav>
      <div className="tree px-2">
        {activeTab === "transport" && (
          <>
            <Search /> <VehicleTree />
          </>
        )}
        {activeTab === "driver" && <DriverTree />}
        {activeTab === "geoZone" && <GeozoneTree />}
      </div>
    </div>
  )
}

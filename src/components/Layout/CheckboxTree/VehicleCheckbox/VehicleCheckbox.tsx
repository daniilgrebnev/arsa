import { IVehicle, IVehicleGroup } from "@/interfaces/vehicle"
import { RootState } from "@/store/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FolderCheckboxTitle } from "../FolderCheckboxTitle/FolderCheckboxTitle"
import "./VehicleCheckbox.css"

type propsType = {
  group: IVehicleGroup
  cheked: IVehicle[]
  onCheked: (params: { vehicle: IVehicle; id: number }) => void
  onCheckedGroup: (id: number) => void
  onRemoveCheckedGroup: (id: number) => void
}

export const VehicleCheckbox: React.FC<propsType> = ({
  group,
  cheked,
  onCheked,
  onCheckedGroup,
  onRemoveCheckedGroup,
}) => {
  const dispatch: any = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const searchedGroups = useSelector((state: RootState) => state.security.searchedVehicle)
  useEffect(() => {
    if (searchedGroups != null && searchedGroups.length !== 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [searchedGroups])
  const onChekedGroup = () => {
    if (group.status === "all") {
      dispatch(onRemoveCheckedGroup(group.id))
      return
    }
    dispatch(onCheckedGroup(group.id))
  }

  return (
    <div className="tree-folder">
      <FolderCheckboxTitle
        onCheked={onChekedGroup}
        status={group.status}
        title={group.gn}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen((prev) => !prev)}
      />
      <div className={`tree-folder__body ${isOpen ? "tree-folder__body--open" : ""}`}>
        {group.vehicles.map((vehicle) => {
          return (
            <label key={vehicle.vehicle_uid} className="tree-folder__element">
              <div
                className={`tree-folder__checkbox ${
                  cheked.includes(vehicle) ? "icon-checked" : ""
                }`}
              ></div>
              <input
                type="checkbox"
                checked={cheked.includes(vehicle)}
                onChange={() => dispatch(onCheked({ vehicle: vehicle, id: group.id }))}
              />
              {vehicle.object_name}
            </label>
          )
        })}
      </div>
    </div>
  )
}

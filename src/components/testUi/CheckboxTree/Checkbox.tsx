import { useState } from "react"

// interface Vehicle {
//   type: "vehicle"
//   vehicle_uid: string
//   vehicle_name: string
// }

// interface Group {
//   type: "group"
//   group_name: string
//   children: Array<Vehicle | Group>
// }

// type Item = Vehicle | Group

interface ICheckboxProps {
  data: any
  keyword: string
  setChecked: React.Dispatch<React.SetStateAction<any>>
  checked: any
  iconExpand?: React.ReactNode
  iconCheck?: React.ReactNode
  iconHalfCheck?: React.ReactNode
  iconNonCheck?: React.ReactNode
  iconNonExpand?: React.ReactNode
  expandAll?: boolean | undefined
}

export const Checkbox = ({
  data,
  keyword,
  setChecked,
  checked,
  iconCheck,
  iconExpand,
  iconHalfCheck,
  iconNonCheck,
  iconNonExpand,
  expandAll,
}: ICheckboxProps) => {
  const [isOpen, setIsOpen] = useState(expandAll || false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const onSelect = (elem) => {
    console.log(elem)
  }
  const handleCheckboxChange = (isChecked: boolean) => {
    if (data.type === "group") {
      const allVehicleUids = getAllVehicleUids(data.children)
      if (isChecked) {
        setChecked((prevChecked) => {
          return Array.from(new Set([...prevChecked, ...allVehicleUids]))
        })
      } else {
        setChecked((prevChecked) => {
          return prevChecked.filter((uid) => !allVehicleUids.includes(uid))
        })
      }
    } else if (data.type === "vehicle") {
      if (isChecked) {
        setChecked((prevChecked) => {
          return Array.from(new Set([...prevChecked, data.vehicle_uid]))
        })
      } else {
        setChecked((prevChecked) => {
          return prevChecked.filter((uid) => uid !== data.vehicle_uid)
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(e.target.checked)
  }

  const handleIconClick = () => {
    handleCheckboxChange(!isChecked())
  }

  const getAllVehicleUids = (children: any): string[] => {
    let uids: string[] = []
    children.forEach((child) => {
      if (child.type === "vehicle") {
        uids.push(child.vehicle_uid)
      } else if (child.type === "group") {
        uids = [...uids, ...getAllVehicleUids(child.children)]
      }
    })
    return uids
  }

  const isChecked = (): boolean => {
    if (data.type === "group") {
      const allVehicleUids = getAllVehicleUids(data.children)
      return allVehicleUids.length > 0 && allVehicleUids.every((uid) => checked.includes(uid))
    } else if (data.type === "vehicle") {
      return checked.includes(data.vehicle_uid)
    }
    return false
  }

  const isHalfChecked = (): boolean => {
    if (!isChecked() && data.type === "group") {
      const allVehicleUids = getAllVehicleUids(data.children)
      return allVehicleUids.some((uid) => checked.includes(uid))
    } else {
      return false
    }
  }

  const checkItemsIsFull = iconCheck && iconHalfCheck && iconNonCheck

  return (
    <div className="my-1">
      <div className="flex items-center gap-2 justify-start" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={isChecked()}
          className={`${isHalfChecked() && "shadow-lg shadow-black"} + ${isChecked() && "shadow-2xl shadow-black"} ${checkItemsIsFull && "hidden"} `}
          onChange={handleInputChange}
        />
        <div className=" ">
          {checkItemsIsFull && (
            <>
              {isHalfChecked() && <div onClick={handleIconClick}>{iconHalfCheck}</div>}
              {isChecked() && <div onClick={handleIconClick}>{iconCheck}</div>}
              {!isChecked() && !isHalfChecked() && (
                <div onClick={handleIconClick}>{iconNonCheck}</div>
              )}
            </>
          )}
        </div>

        {data.type === "vehicle" && (
          <div className="" onClick={handleIconClick}>
            {data.vehicle_name}
          </div>
        )}
        {data.type === "group" && (
          <>
            <span onClick={handleToggle}>
              {isOpen ? (
                <> {iconExpand ? iconExpand : "[+]"} </>
              ) : (
                <> {iconNonExpand ? iconNonExpand : "[-]"} </>
              )}
            </span>
            {
              <div className="" onClick={handleToggle}>
                {data.group_name}
              </div>
            }
          </>
        )}
      </div>
      {isOpen && data.type === "group" && (
        <div className="ml-2">
          {data.children.map((item) => (
            <Checkbox
              key={item.type === "vehicle" ? item.vehicle_uid : item.group_name}
              data={item}
              keyword={keyword}
              checked={checked}
              setChecked={setChecked}
              iconCheck={iconCheck}
              iconExpand={iconExpand}
              iconHalfCheck={iconHalfCheck}
              iconNonCheck={iconNonCheck}
              iconNonExpand={iconNonExpand}
              expandAll={expandAll}
            />
          ))}
        </div>
      )}
    </div>
  )
}

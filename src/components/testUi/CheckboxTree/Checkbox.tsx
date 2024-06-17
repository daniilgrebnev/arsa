import { useEffect, useState } from "react"

interface ICheckboxProps {
  data: any
  keyword: string
  checkField: string
  setChecked: React.Dispatch<React.SetStateAction<any>>
  checked: any
  iconExpand?: React.ReactNode
  iconCheck?: React.ReactNode
  iconHalfCheck?: React.ReactNode
  iconNonCheck?: React.ReactNode
  iconNonExpand?: React.ReactNode
  CheckboxLabel?: React.ComponentType<{ item: any }>
  expandAll?: boolean | undefined
}

export const Checkbox = ({
  data,
  keyword,
  setChecked,
  checked,
  checkField,
  iconCheck,
  iconExpand,
  iconHalfCheck,
  iconNonCheck,
  iconNonExpand,
  expandAll,
  CheckboxLabel,
}: ICheckboxProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleCheckboxChange = (isChecked: boolean) => {
    if (data[keyword] !== undefined) {
      const allVehicleUids = getAllVehicleUids(data[keyword])
      if (isChecked) {
        setChecked((prevChecked) => {
          return Array.from(new Set([...prevChecked, ...allVehicleUids]))
        })
      } else {
        setChecked((prevChecked) => {
          return prevChecked.filter((value) => !allVehicleUids.includes(value))
        })
      }
    } else if (data[keyword] === undefined) {
      if (isChecked) {
        setChecked((prevChecked) => {
          return Array.from(new Set([...prevChecked, data[checkField]]))
        })
      } else {
        setChecked((prevChecked) => {
          return prevChecked.filter((value) => value !== data[checkField])
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
    let items: string[] = []
    children.forEach((child) => {
      if (child[keyword] === undefined) {
        items.push(child[checkField])
      } else if (child[keyword] !== undefined) {
        items = [...items, ...getAllVehicleUids(child.children)]
      }
    })
    return items
  }

  const isChecked = (): boolean => {
    if (data[keyword] !== undefined) {
      const allVehicleUids = getAllVehicleUids(data[keyword])
      return (
        allVehicleUids.length > 0 &&
        allVehicleUids.every((uid) => checked != undefined && checked.includes(uid))
      )
    } else if (data[keyword] === undefined) {
      return checked != undefined && checked.includes(data[checkField])
    }
    return false
  }
  useEffect(() => {
    setIsOpen(expandAll || false)
  }, [checked, data, isChecked, expandAll])
  const isHalfChecked = (): boolean => {
    if (!isChecked() && data[keyword] !== undefined) {
      const allVehicleUids = getAllVehicleUids(data[keyword])
      return (
        checked != undefined &&
        allVehicleUids.some((id) => checked != undefined && checked.includes(id))
      )
    } else {
      return false
    }
  }

  const checkItemsIsFull = iconCheck && iconHalfCheck && iconNonCheck

  return (
    <div className="my-1 w-full">
      <div
        style={{
          gridTemplateColumns:
            data[keyword] !== undefined ? "25px 25px calc(100% - 50px )" : "25px calc(100% - 25px)",
        }}
        className={`grid items-center pr-4 justify-start w-full cursor-pointer`}
      >
        <input
          type="checkbox"
          checked={isChecked()}
          className={`${isHalfChecked() && "shadow-lg shadow-black"} + ${isChecked() && "shadow-2xl shadow-black"} ${checkItemsIsFull && "hidden"} `}
          onChange={handleInputChange}
        />
        <div className=" ">
          {checkItemsIsFull && (
            <>
              {isHalfChecked() && (
                <div onClick={() => handleCheckboxChange(true)}>{iconHalfCheck}</div>
              )}
              {isChecked() && <div onClick={() => handleCheckboxChange(false)}>{iconCheck}</div>}
              {!isChecked() && !isHalfChecked() && (
                <div onClick={() => handleCheckboxChange(true)}>{iconNonCheck}</div>
              )}
            </>
          )}
        </div>

        {data[keyword] === undefined && (
          <div
            className=""
            onClick={(e) => {
              e.stopPropagation()
              handleIconClick()
            }}
          >
            {CheckboxLabel !== undefined ? (
              <CheckboxLabel item={data}></CheckboxLabel>
            ) : (
              <div>{data.name}</div>
            )}
          </div>
        )}
        {data[keyword] !== undefined && (
          <>
            <span
              onClick={(e) => {
                e.stopPropagation()
                handleToggle()
              }}
            >
              {isOpen && data[keyword] !== undefined ? (
                <> {iconExpand ? iconExpand : "[+]"} </>
              ) : (
                <> {iconNonExpand ? iconNonExpand : "[-]"} </>
              )}
            </span>
            {
              <div className="" onClick={handleToggle}>
                {data.name || data.group_name}
              </div>
            }
          </>
        )}
      </div>
      {isOpen && data[keyword] !== undefined && (
        <div className={`ml-1`}>
          {data[keyword].map((item, index) => (
            <Checkbox
              CheckboxLabel={CheckboxLabel}
              key={index}
              data={item}
              checkField={checkField}
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

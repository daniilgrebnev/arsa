import { RootState } from "@/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Checkbox } from "./Checkbox"
import { checkboxProcess } from "./checkbox-process"

interface ICheckboxTreeProps {
  data: any
  keyword: string
  iconExpand?: React.ReactNode
  iconCheck?: React.ReactNode
  iconHalfCheck?: React.ReactNode
  iconNonCheck?: React.ReactNode
  iconNonExpand?: React.ReactNode
  expandAll?: boolean
  onChecked: React.Dispatch<React.SetStateAction<any>>
  checked: any
}

const CheckboxTree = ({
  data,
  keyword,
  onChecked,
  checked,
  iconExpand,
  iconHalfCheck,
  iconCheck,
  iconNonCheck,
  iconNonExpand,
  expandAll,
}: ICheckboxTreeProps) => {
  useEffect(() => {}, [checked, expandAll])
  const { isSearch } = useSelector((state: RootState) => state.vehicles)
  const rows: any[] = checkboxProcess(data)

  return (
    <div>
      {rows.map((i) => (
        <Checkbox
          iconCheck={iconCheck}
          iconExpand={iconExpand}
          iconHalfCheck={iconHalfCheck}
          iconNonCheck={iconNonCheck}
          iconNonExpand={iconNonExpand}
          key={i.type === "vehicle" ? i.vehicle_uid : i.group_name}
          data={i}
          keyword={keyword}
          setChecked={onChecked}
          checked={checked}
          expandAll={isSearch}
        />
      ))}
    </div>
  )
}

export default CheckboxTree

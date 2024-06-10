import { useEffect } from "react"
import { Checkbox } from "./Checkbox"

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

  useEffect(() => {}, [checked, data])

  return (
    <div>
      {data.map((i: any, index) => (
        <Checkbox
          iconCheck={iconCheck}
          iconExpand={iconExpand}
          iconHalfCheck={iconHalfCheck}
          iconNonCheck={iconNonCheck}
          iconNonExpand={iconNonExpand}
          key={index}
          data={i}
          keyword={keyword}
          setChecked={onChecked}
          checked={checked}
          expandAll={expandAll}
        />
      ))}
    </div>
  )
}

export default CheckboxTree

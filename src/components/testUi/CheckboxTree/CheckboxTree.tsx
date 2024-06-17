import { useEffect, useState } from "react"
import { Checkbox } from "./Checkbox"

interface ICheckboxTreeProps {
  data: any
  keyword: string
  checkField: string
  iconExpand?: React.ReactNode
  iconCheck?: React.ReactNode
  iconHalfCheck?: React.ReactNode
  iconNonCheck?: React.ReactNode
  iconNonExpand?: React.ReactNode
  CheckboxLabel?: React.ComponentType<any>
  expandAll?: boolean
  onChecked: React.Dispatch<React.SetStateAction<any>>
  checked: any
}

const CheckboxTree = ({
  data,
  keyword,
  checkField,
  onChecked,
  checked,
  iconExpand,
  iconHalfCheck,
  iconCheck,
  iconNonCheck,
  iconNonExpand,
  expandAll,
  CheckboxLabel,
}: ICheckboxTreeProps) => {
  const [expandAllGroups, setExpandAllGroups] = useState(expandAll || false)

  useEffect(() => {
    setExpandAllGroups(expandAll || false)
  }, [expandAll])

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <Checkbox
          CheckboxLabel={CheckboxLabel}
          iconCheck={iconCheck}
          iconExpand={iconExpand}
          iconHalfCheck={iconHalfCheck}
          iconNonCheck={iconNonCheck}
          iconNonExpand={iconNonExpand}
          key={index}
          data={item}
          checkField={checkField}
          keyword={keyword}
          setChecked={onChecked}
          checked={checked}
          expandAll={expandAllGroups}
        />
      ))}
    </div>
  )
}

export default CheckboxTree

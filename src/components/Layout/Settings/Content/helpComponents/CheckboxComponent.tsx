import React, { useEffect, useState } from "react"
import { Ok } from "../../../../../styles/image/Ok"

interface ICheckboxComponent {
  value: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxComponent: React.FC<ICheckboxComponent> = ({ value, onChange }) => {
  const [checked, setChecked] = useState<boolean>(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  const checkedClick = () => {
    setChecked(!checked)
    onChange({
      target: { type: "checkbox", checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div
        onClick={checkedClick}
        className={`w-6 flex items-center justify-center transition-all cursor-pointer rounded aspect-square ${
          checked ? "border-0 bg-orange-500" : "border bg-transparent border-orange-500"
        }`}
      >
        {checked && <Ok fill="white" width={20} />}
      </div>
    </div>
  )
}

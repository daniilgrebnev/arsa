// ObjectSettingsItem.tsx
import React from "react"
import { CheckboxComponent } from "../helpComponents/CheckboxComponent"
import { NumberComponent } from "../helpComponents/NumberComponent"
import { SwitchComponent } from "../helpComponents/SwitchComponent"
import { TextareaComponent } from "../helpComponents/TextareaComponent"
export interface ISwitchBody {
  option: any
  name: string
}
type TChangedValue = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

interface IObjectSettingsItemProps {
  title: string
  value: any
  onChange: (e: TChangedValue) => void
  type: "checkbox" | "text" | "switch" | "number"

  body?: ISwitchBody[]
}

export const ObjectSettingsItem: React.FC<IObjectSettingsItemProps> = ({
  title,
  value,
  onChange,
  type,
  body,
}) => {
  return (
    <>
      <h2 className="text-right text-xl font-light">{title}</h2>
      {type === "text" && <TextareaComponent value={value} onChange={onChange} />}
      {type === "checkbox" && <CheckboxComponent value={value} onChange={onChange} />}
      {type === "switch" && (
        <SwitchComponent value={value} onChange={onChange} body={body ? body : []} />
      )}
      {type === "number" && <NumberComponent value={value} onChange={onChange} />}
    </>
  )
}

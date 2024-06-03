import { IObjectWheel } from "@/interfaces/objectSettings"
import { Wheel } from "./Wheel"

interface IObjectSettingsAxleSide {
  side: IObjectWheel[]
  position: "L" | "R"
}
export const AxleSide = ({ side, position }: IObjectSettingsAxleSide) => {
  console.log(side)
  return (
    <div className={`flex ${position == "L" && "flex-row-reverse"} gap-2`}>
      {side.map((item, index) => (
        <Wheel data={item} />
      ))}
    </div>
  )
}

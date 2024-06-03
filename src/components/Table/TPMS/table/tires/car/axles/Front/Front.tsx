import { IWheel } from "@/helpers/axlesInitter"
import { Wheel } from "../../Wheel"
import FrontImg from "./images/FrontImg"

interface IProps {
  front: any[]
}

export const Front = ({ front }: IProps) => {
  const wheels: IWheel[] = front
  const middleIndex = Math.ceil(wheels.length / 2)
  const leftWheels = wheels.slice(0, middleIndex)
  const rightWheels = wheels.slice(middleIndex)
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute right-[80%] top-1  flex gap-2 items-center justify-end">
        {leftWheels.map((item, index) => (
          <div key={index}>
            <Wheel {...item} />
          </div>
        ))}
      </div>
      <div className="">
        <FrontImg width={150} />
      </div>

      <div className="absolute left-[80%] top-1 flex gap-2 items-center justify-start">
        {rightWheels.map((item, index) => (
          <div key={index} className="">
            <Wheel {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

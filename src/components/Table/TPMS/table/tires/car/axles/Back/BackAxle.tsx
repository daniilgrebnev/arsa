import { IWheel } from "@/helpers/axlesInitter"
import React from "react"
import { Wheel } from "../../Wheel"

interface IProps {
  backAxle: IWheel[]
}

export const BackAxle: React.FC<IProps> = ({ backAxle }) => {
  const wheels: IWheel[] = backAxle.map((item, index) => item[0])

  const middleIndex = Math.ceil(wheels.length / 2)
  const leftWheels = wheels.slice(0, middleIndex)
  const rightWheels = wheels.slice(middleIndex)

  return (
    <div className="relative flex  justify-center items-center">
      <div className="absolute left-0 top-full flex gap-2 items-center justify-end">
        {leftWheels.map((item, index) => (
          <div key={index}>
            <Wheel {...item} />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-full flex gap-2 items-center justify-start">
        {rightWheels.map((item, index) => (
          <div key={index}>
            <Wheel {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

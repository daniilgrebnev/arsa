import { IWheel } from "@/helpers/axlesInitter"
import React, { useEffect, useState } from "react"
import { BackAxle } from "./BackAxle"
import { BackImg } from "./images/BackImg"

interface IProps {
  back: IWheel[][]
}

export const Back: React.FC<IProps> = ({ back }) => {
  const [wheelHeight, setWheelHeight] = useState(0)
  useEffect(() => {
    setWheelHeight(back.length * 4)
  }, [back])

  return (
    <div className="w-[150px] h-full transition-all">
      <div className="absolute w-full ">
        <div
          style={{
            height: wheelHeight + 1.25 + "rem",
          }}
          className="transition-all  w-1/2 bg-opacity-[73%] min-h-[150px]  my-0 mx-auto bg-black "
        ></div>
        <div
          style={
            {
              // top: wheelHeight - 1.25 + "rem",
            }
          }
          className="relative transition-all w-full h-full mx-auto "
        >
          <BackImg width={150} />
        </div>
      </div>
      <div className="relative -bottom-10 ">
        {back.map((axle, index) => (
          <div className="relative h-16">
            <BackAxle key={index} backAxle={axle} />
          </div>
        ))}
      </div>
    </div>
  )
}
